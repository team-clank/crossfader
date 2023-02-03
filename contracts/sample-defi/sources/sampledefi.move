module ra_addr::sampledefi {
    use std::signer;
    use aptos_std::table::{Self, Table};
    use aptos_framework::account::{Self, SignerCapability};
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::resource_account;

    #[test_only]
    use std::vector;
    #[test_only]
    use std::string;
    #[test_only]
    use aptos_framework::aptos_coin::AptosCoin;
    #[test_only]
    use aptos_framework::account::create_account_for_test;

    const ONE_DAY_SEC: u64 = 86400;

    // Errors
    const E_ALREADY_INIT_COINSTORE: u64 = 1;

    struct ModuleData has key {
        signer_cap: SignerCapability,
    }

    struct CoinStore<phantom CoinType> has key {
        coins: Table<address, Coin<CoinType>>,
    }

    fun init_module(resource_signer: &signer) {
        let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_signer, @origin_account);
        move_to(resource_signer, ModuleData {
            signer_cap: resource_signer_cap,
        });
    }

    public entry fun init_coin_store<CoinType>(_account: &signer) acquires ModuleData {
        let module_data = borrow_global_mut<ModuleData>(@ra_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        move_to(&resource_signer, CoinStore<CoinType> {
            coins: table::new<address, Coin<CoinType>>(),
        });
    }

    public entry fun deposit<CoinType>(account: &signer, amount: u64) acquires CoinStore {
        let addr = signer::address_of(account);
        let coin_store = borrow_global_mut<CoinStore<CoinType>>(@ra_addr);
        if (!table::contains(&coin_store.coins, addr)) {
            table::add(&mut coin_store.coins, addr, coin::zero<CoinType>());
        };
        let deposited_coins = table::borrow_mut(&mut coin_store.coins, addr);
        let coins = coin::withdraw<CoinType>(account, amount);
        coin::merge(deposited_coins, coins);
    }

    public entry fun withdraw<CoinType>(account: &signer, amount: u64) acquires CoinStore {
        let addr = signer::address_of(account);
        let coin_store = borrow_global_mut<CoinStore<CoinType>>(@ra_addr);
        let deposited_coins = table::borrow_mut(&mut coin_store.coins, addr);
        let extracted = coin::extract<CoinType>(deposited_coins, amount);
        coin::deposit<CoinType>(addr, extracted);
    }

    public fun balance<CoinType>(addr: address): u64 acquires CoinStore {
        let coin_store = borrow_global<CoinStore<CoinType>>(@ra_addr);
        let deposited_coins = table::borrow(&coin_store.coins, addr);
        coin::value<CoinType>(deposited_coins)
    }

    #[test_only]
    public fun set_up_test(
        origin_account: &signer,
        resource_account: &signer,
        user_account: &signer,
        aptos_framework: &signer
    ) {
        create_account_for_test(signer::address_of(origin_account));

        // create a resource account from the origin account, mocking the module publishing process
        resource_account::create_resource_account(origin_account, vector::empty<u8>(), vector::empty<u8>());
        init_module(resource_account);

        create_account_for_test(signer::address_of(user_account));

        // init AptosCoin
        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<AptosCoin>(
            aptos_framework,
            string::utf8(b"TC"),
            string::utf8(b"TC"),
            8,
            false,
        );

        // register and mint AptosCoin
        coin::register<AptosCoin>(user_account);

        let coins = coin::mint<AptosCoin>(8000, &mint_cap);
        coin::deposit(signer::address_of(user_account), coins);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_freeze_cap(freeze_cap);
        coin::destroy_mint_cap(mint_cap);

        assert!(coin::balance<AptosCoin>(signer::address_of(user_account)) == 8000, 0);
    }

    #[test(origin_account = @origin_account, resource_account = @ra_addr, user_account = @0x123, aptos_framework=@aptos_framework)]
    public entry fun test_overall(origin_account: &signer, resource_account: &signer, user_account: &signer, aptos_framework: &signer) acquires ModuleData, CoinStore {
        set_up_test(origin_account, resource_account, user_account, aptos_framework);
        init_coin_store<AptosCoin>(origin_account);

        deposit<AptosCoin>(user_account, 5000);
        assert!(balance<AptosCoin>(signer::address_of(user_account)) == 5000, 0);
        assert!(coin::balance<AptosCoin>(signer::address_of(user_account)) == 3000, 0);

        withdraw<AptosCoin>(user_account, 2000);
        assert!(balance<AptosCoin>(signer::address_of(user_account)) == 3000, 0);
        assert!(coin::balance<AptosCoin>(signer::address_of(user_account)) == 5000, 0);
    }
}

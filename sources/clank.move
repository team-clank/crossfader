module module_addr::clank {
    use std::error;
    use std::signer;
    use std::vector;
    use aptos_std::table::{Self, Table};
    use aptos_framework::account::{Self, SignerCapability};
    use aptos_framework::resource_account;
    use aptos_framework::coin::{Self, Coin};

    #[test_only]
    use std::string;
    #[test_only]
    use aptos_framework::aptos_coin::AptosCoin;

    // Errors
    const E_ALREADY_INIT_VAULTS: u64 = 1;
    const E_ALREADY_INIT_VAULT: u64 = 2;
    const E_VAULTS_NOT_INITIALIZED: u64 = 3;
    const E_VAULT_NOT_INITIALIZED: u64 = 4;
    const E_INAPPROPRIATE_SECOND_FA: u64 = 5;

    struct ModuleData has key {
        signer_cap: SignerCapability,
    }

    struct Vaults<phantom CoinType> has key {
        vaults: Table<address, Vault<CoinType>>,
        vault_count: u64,
    }

    struct Vault<phantom CoinType> has store {
        addr_2fa: address,
        // original_auth: vec<u8>,
        coins: Coin<CoinType>,
        withdrawal_limit: u64,
        withdrawal_waiting: Table<address, Coin<CoinType>>,
        withdrawal_history: vector<WithdrawalHistroy>,
        limit_change_req: LimitChangeReq,
    }

    struct WithdrawalHistroy has store, drop {
        amount: u64,
        timestampe: u64,
    }

    struct LimitChangeReq has store {
        req_1: u64,
        req_2: u64,
    }

    fun init_module(resource_signer: &signer) {
        let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_signer, @source_addr);
        move_to(resource_signer, ModuleData {
            signer_cap: resource_signer_cap,
        });
    }

    public entry fun init_vaults<CoinType>(_account: &signer) acquires ModuleData {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(!exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_ALREADY_INIT_VAULTS);
        move_to(&resource_signer, Vaults<CoinType> {
            vaults: table::new<address, Vault<CoinType>>(),
            vault_count: 0,
        });
    }

    public entry fun initialize<CoinType>(account: &signer, addr_2fa: address, withdrawal_limit: u64) acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);
        let addr = signer::address_of(account);
        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(!table::contains(&vaults.vaults, addr), E_ALREADY_INIT_VAULT);
        // account::create_account(addr_2fa);
        table::add(&mut vaults.vaults, addr, Vault<CoinType> {
            addr_2fa,
            coins: coin::zero<CoinType>(),
            withdrawal_limit,
            withdrawal_waiting: table::new<address, Coin<CoinType>>(),
            withdrawal_history: vector::empty<WithdrawalHistroy>(),
            limit_change_req: LimitChangeReq {
                req_1: 0,
                req_2: 0,
            },
        });
        vaults.vault_count = vaults.vault_count + 1;
    }

    public entry fun deposit<CoinType>(account: &signer, amount: u64) acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);
        let addr = signer::address_of(account);
        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(table::contains(&vaults.vaults, addr), E_VAULT_NOT_INITIALIZED);
        let vault = table::borrow_mut(&mut vaults.vaults, addr);
        let coins = coin::withdraw<CoinType>(account, amount);
        coin::merge(&mut vault.coins, coins);
    }

    #[view]
    public fun balance<CoinType>(addr: address): u64 acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);
        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(table::contains(&vaults.vaults, addr), E_VAULT_NOT_INITIALIZED);
        let vault = table::borrow(&vaults.vaults, addr);
        coin::value<CoinType>(&vault.coins)
    }

    // TODO : for test, REMOVE THIS
    public entry fun withdraw<CoinType>(account: &signer, receiver: address, amount: u64) acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);

        let addr = signer::address_of(account);
        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(table::contains(&vaults.vaults, addr), E_VAULT_NOT_INITIALIZED);

        let vault = table::borrow_mut(&mut vaults.vaults, addr);
        let extracted = coin::extract<CoinType>(&mut vault.coins, amount);
        coin::deposit<CoinType>(receiver, extracted);
    }

    // TODO : check withdrawal_limit
    public entry fun request_withdraw<CoinType>(account: &signer, receiver: address, amount: u64) acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);

        let addr = signer::address_of(account);
        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(table::contains(&vaults.vaults, addr), E_VAULT_NOT_INITIALIZED);

        let vault = table::borrow_mut(&mut vaults.vaults, addr);
        let extracted = coin::extract<CoinType>(&mut vault.coins, amount);
        if (table::contains(&vault.withdrawal_waiting, receiver)) {
            let waiting = table::borrow_mut(&mut vault.withdrawal_waiting, receiver);
            coin::merge<CoinType>(waiting, extracted);
        } else {
            table::add(&mut vault.withdrawal_waiting, receiver, extracted);
        }
    }

    public entry fun allow_withdraw<CoinType>(account: &signer, sender: address, receiver: address, amount: u64) acquires ModuleData, Vaults {
        let module_data = borrow_global_mut<ModuleData>(@module_addr);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        assert!(exists<Vaults<CoinType>>(signer::address_of(&resource_signer)), E_VAULTS_NOT_INITIALIZED);

        let vaults = borrow_global_mut<Vaults<CoinType>>(@module_addr);
        assert!(table::contains(&vaults.vaults, sender), E_VAULT_NOT_INITIALIZED);

        let vault = table::borrow_mut(&mut vaults.vaults, sender);
        assert!(vault.addr_2fa == signer::address_of(account), E_INAPPROPRIATE_SECOND_FA);
        let extracted = coin::extract<CoinType>(&mut vault.coins, amount);
        coin::deposit<CoinType>(receiver, extracted);
    }
    
    // TODO : TEST CODES
}

# How to deploy and use Crossfader module

## Deploy module
```aptos move create-resource-account-and-publish-package --seed 1235 --address-name ra_addr```
1. It creates a resource acccount with the given seed.
2. It publishes package. When the package published, your account loses the control of resource account.
3. `init_module` is called when it published

**Reference)**
- [Aptos account system](https://aptos.dev/concepts/accounts)
- [Usage of resource account](https://aptos.dev/guides/move-guides/mint-nft-cli)

## Initialization before starting the service
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::init_vaults --type-args 0x1::aptos_coin::AptosCoin```

It is another step for initializing the contract. It needs just to be called once in Crossfader. Every user uses the same module. It is totally safe because nobody has a control over the resource account module.

**With the type args, Crossfader can be used for any coins!**

## Initialization for each user
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::initialize --type-args 0x1::aptos_coin::AptosCoin --args address:0x1223334444 u64:10000```

It is called for each user. In a command line interface, don't forget to create the second account. **Absolutely, users don't need to create it. Crossfader's server will create it and secure it with users' SSO auth :D**

## Deposit APT
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::deposit --type-args 0x1::aptos_coin::AptosCoin --args u64:100000```

## Direct withdrawal
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::request_withdraw --type-args 0x1::aptos_coin::AptosCoin --args address:0x12351131234 u64:5000```

Withdrawal limitation is 10000, so you can use your 5000 APT only with your account signature.

## 2FA case
### Withdrawal request
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::request_withdraw --type-args 0x1::aptos_coin::AptosCoin --args address:0x12351131234 u64:6000```

Withdrawal sum exceeded the limit! You need another approval with Crossfader's safe 2FA.  
Fyi, the sum is calculated among 1 day.

### Withdrawal approval
```aptos move run --function-id 675340b1ccf7f77b888dbc13e70460eb95da791c8af2202230be4e6528559799::clank_draft::deposit --type-args 0x1::aptos_coin::AptosCoin --args address:[YOUR ACCOUNT ADDRESS] address:0x12351131234 u64:6000 --profile [PROFILE]```

The withdrawal request need to be approved from 2FA. In a test env, for getting signature of the second account(as a role of a server-side auth), you can use CLI options like --profile, --private-key, --private-key-file, --sender-account. Of course, in real Crossfader service, the only thing a user needs to do is SSO auth :D

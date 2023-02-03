# Proposal For `Native conditional multi-sig`

## Aptos account system
The Aptos account system is secure, but also flexible than any other blockchain, such as native key rotation, multi-sig are possible. So it has enormous potential.

We thought we could suggest a new authentication scheme and improve Aptos account experience.
(As of a PoC service of `On-chain conditional 2FA`, please refer [the github link](https://github.com/team-clank/crossfader-aptos-contract))

# Native customized multi-sig
As a new authentication method, we propose native customized multi-sig.

## What is required to validate transaction in Aptos?

### Making signed transaction requires ```Authenticator``` and ```RawTransaction```
<img width="603" src="https://user-images.githubusercontent.com/48384542/217876967-4f3a8793-59bb-4408-8863-2962d0aa14ce.png">

[rawToSigned code](https://github.com/aptos-labs/aptos-core/blob/7fc95ab4b37597654241613af26f153e5a7ceeed/ecosystem/typescript/sdk/src/transaction_builder/builder.ts#L102-L111)

Validator should be able to verify that the signed transaction is correct.
So client sdk should pass signed transaction with ```Authenticator``` and ```RawTransaction```

- ```Authenticator```: Manage the variables required for verification according to the transaction type

### The type of ```Authenticator``` used depends on the type of transaction
<img width="603" src="https://user-images.githubusercontent.com/48384542/217878872-0b8cecc9-d075-41c7-8878-28d1d38d5237.png">

[Authenticator implementation code](https://github.com/aptos-labs/aptos-core/blob/7fc95ab4b37597654241613af26f153e5a7ceeed/ecosystem/typescript/sdk/src/aptos_types/authenticator.ts#L10-L26)

- singleSig(```TransactionAuthenticatorEd25519```): manage ```public_key``` and ```signature``` derived by Ed25519 
- multiSig(```TransactionAuthenticatorMultiEd25519```): manage ```public_key``` and ```signature``` derived by MultiEd25519
- multiAgent(```TransactionAuthenticatorMultiAgent```): manage ```sender```, ```secondary_signer_addresses``` and ```secondary_signers```

## Basis of a proposal

### 1. Add new auth scheme in sdk: ```TransactionAuthenticatorConditionalMulti```

<img width="564" alt="스크린샷 2023-02-06 오전 12 21 41" src="https://user-images.githubusercontent.com/26621762/216828151-91e8081c-1179-43ab-8303-c5dc275f8ff2.png">

Adding new auth scheme on both the client side and the node side is easy in Aptos. It has well structured and clean function interface. They're ready-to-be-added.

we want to implement an account with APTlimit.

So new authenticator(```TransactionAuthenticatorConditionalMulti```) will be implemented like this.

````typescript
export class TransactionAuthenticatorConditionalMulti extends TransactionAuthenticator {
  constructor(
    public readonly primary_pubkey: Ed25519PublicKey,
    public readonly primary_signature: Ed25519Signature,
    public readonly secondary_pubkey: Ed25519PublicKey,
    public readonly secondary_signature: Ed25519Signature,
    public readonly apt_limit: number,
    public readonly apt_in_tx: number
  ) {
    super();
  }
  ...
}
````

- when ```apt_in_tx``` <= ```apt_limit```, only check ```primary_pubkey``` and ```primary_signature```
- when ```apt_in_tx``` > ```apt_limit```, validators also need to check ```secondary_pubkey``` and ```secondary_signature```

```apt_in_tx``` can be added in ```Authenticator```. Because Multiagent transaction uses the internal transaction information for authentication.

It means transferred APT in tx can also be used for authentication

<img width="554" alt="스크린샷 2023-02-06 오전 12 22 16" src="https://user-images.githubusercontent.com/26621762/216828184-08a51f53-f40a-4ea4-b10c-531c9cf4b974.png">

### 2. Add new validating logic in validator
<img width="603" alt="스크린샷 2023-02-10 오전 1 48 56" src="https://user-images.githubusercontent.com/48384542/217881972-b4930c55-855a-4f3e-a789-2ace194642ad.png">

[current validating transaction code](https://github.com/aptos-labs/aptos-core/blob/7fc95ab4b37597654241613af26f153e5a7ceeed/api/types/src/transaction.rs#L808-L822)

we will also implement new validating logic for conditional-multi-sig.

- validating ```primary_signature``` and ```secondary_signature``` can reuse verification logic used in ```Ed25519Signature```
- if ```apt_in_tx``` <= ```apt_limit```, don't need to validate ```secondary_signature```

<img width="558" alt="스크린샷 2023-02-06 오전 12 25 37" src="https://user-images.githubusercontent.com/26621762/216828371-ad6940cf-7c76-4539-9970-768b38e826d6.png">

### 3. Propose new authentication key format: conditional-multi-sig

In Aptos, Multi-signer authentication key is shown as follows:
```
auth_key = sha3-256(p_1 | . . . | p_n | K | 0x01)
```

Similarly, we will propose a new address system
````
auth_key = sha3-256(primary_pubkey | secondary_pubkey | APT_limit | 0x02)
````

<img width="592" alt="스크린샷 2023-02-06 오전 12 26 16" src="https://user-images.githubusercontent.com/26621762/216828395-31710c44-de36-4238-b145-e4b495b619a8.png">

## Impact on Aptos(Move)

Adopting conditional-multi-sig in Aptos-core will open various possibilities in Aptos.
- Conditional-Multi-sig can send transaction without restriction
- Conditional-Multi-sig can be used in DAO, Vault contract, etc ...
- Other account authentication methods can be added in Move contract layer

# Proposal For `Native conditional multi-sig`

## Aptos account system
The Aptos account system is secure, but also flexible than any other blockchain, such as native key rotation, multi-sig are possible. So it has enormous potential.

We thought we could suggest a new authentication scheme and improve Aptos account experience.
(As of a PoC service of `On-chain conditional 2FA`, please refer [the github link](https://github.com/team-clank/crossfader-aptos-contract))

# Native customized multi-sig
As a new authentication method, we propose native customized multi-sig.

## Basis of a proposal

1. Adding new auth scheme on both the client side and the node side is easy in Aptos. It has well structured and clean function interface. They're ready-to-be-added.

<img width="564" alt="스크린샷 2023-02-06 오전 12 21 41" src="https://user-images.githubusercontent.com/26621762/216828151-91e8081c-1179-43ab-8303-c5dc275f8ff2.png">

2. The information required for auth varies depending on the type of tx. Multiagent transaction uses the internal transaction information for authentication. It means transferred APT in tx can also be used for authentication

<img width="554" alt="스크린샷 2023-02-06 오전 12 22 16" src="https://user-images.githubusercontent.com/26621762/216828184-08a51f53-f40a-4ea4-b10c-531c9cf4b974.png">

## Our plan

1. Adding authenticcator logic and verification logic each to client and node

<img width="558" alt="스크린샷 2023-02-06 오전 12 25 37" src="https://user-images.githubusercontent.com/26621762/216828371-ad6940cf-7c76-4539-9970-768b38e826d6.png">

2. customized multi-sig address system

<img width="592" alt="스크린샷 2023-02-06 오전 12 26 16" src="https://user-images.githubusercontent.com/26621762/216828395-31710c44-de36-4238-b145-e4b495b619a8.png">

## Impact on Aptos(Move)

Various types of authentication methods using Move in Contract layer.

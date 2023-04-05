# Crossfader(CLANK)
### ![Winner of Aptos World Tour Seoul Hack 2023(Honorable Mention, Track: Best Move)](https://aptosfoundation.org/currents/aptos-world-tour-seoul-hack-recap-2023)
**Crossfader** is on-chain vault with conditional 2FA

We introduced `On-chain Contidional MFA(Multi-factor authentication)` in [Aptos hackathon](https://aptosfoundation.org/currents/aptos-world-tour-hackathon-seoul-2023). Crossfader was made as a proof of concept. For the new authentication scheme we suggested at the hackathon, please refer to this link. [Native customzied multi-sig on Aptos](https://github.com/team-clank/crossfader/blob/main/CUSTOMIZED-MULTI-SIG.md)

### why is this product called Crossfader?
Crossfader is a slider used by a DJ to naturally flip or mix sounds between two sources. You can move the crossfader left and right. DJ can play one side of the music, or mix it properly.

The importance between security and convenience varies from person to person, from situation to situation. It is not divided into 0 or 1.

It should be adjusted like a crossfader.

## Demo

### withdraw

![withdraw](https://user-images.githubusercontent.com/48384542/217027649-4d90c15c-6522-45ed-a225-0d82a8eb7258.gif)

### overwithdraw

![overwithdraw](https://user-images.githubusercontent.com/48384542/217027589-0b8c1142-3e0e-414f-a55d-10d8af03da2c.gif)

## Problems

How do you keep your on-chain assets? There might be two most secure ways. a multi-sig tool or a hard wallet. The most convenient method is probably a hot wallet. But, Using multi-sig, or dividing accounts are too incovenient. The most wallets rely on all assets for only one private key.

## Key features

### 'Conditional' 2FA

It requires additional authentication, only when conditions are satisfied.

When you use a small amount of money, only one signature is needed.

<img width="521" alt="스크린샷 2023-02-06 오전 12 03 12" src="https://user-images.githubusercontent.com/26621762/216827189-f3329196-5739-4504-8467-cf6b6a4b8a69.png">

However, if the withdrawal limit you set is exceeded, Single-Sign On authentication is also required.

<img width="545" alt="스크린샷 2023-02-06 오전 12 03 37" src="https://user-images.githubusercontent.com/26621762/216827211-c4c56f75-a0ef-46e4-af89-4a1fcbeb4d16.png">

Small amounts can be used conveniently, and large amounts can be kept safe.

### 'Weighted' 2FA

We minimized the privileges of other auth factors, except for the original private key.
Only with SSO authentication, there is nothing to do.

When small amounts, it doesn’t do anything.
When large, it can just approve.

It enhances security, without any new point of failure.

### Asset operation

Of course, you can operate the assets in the vault.
<img width="676" alt="스크린샷 2023-02-06 오전 12 06 12" src="https://user-images.githubusercontent.com/26621762/216827364-b74391d5-1ce3-40cc-bc65-7ab0256c2715.png">

The contract contains, the addresses of a particular Defi service and its functions. The user can choose from among them and use them.
The number of activities will keep being added.

## What’s next for Crossfader

- **Aptos-core contribution for suggesting `native customized multi sig`** (Please visit [the link](https://github.com/team-clank/crossfader/blob/main/CUSTOMIZED-MULTI-SIG.md) if you are interested!)
  - Flagship service of the new standard
  - more secure conditional 2FA account
  - secured dynamic transactions
- Connecting Various Defi
- Notification for hacking detection.
- Support key rotation when hacking

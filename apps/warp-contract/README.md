# warp-contract

Gommette smart contract, built with Warp/smartweave and typescript.
Bootstrapped from [Warp TypeScript template](https://github.com/warp-contracts/templates/tree/main/contracts/typescript).

## Features

- [x] get "session data" for a player (current player info, map, inventory, sticker boards)
- [x] get overworld map
- [x] get overworld map history for a given timestamp
- [x] get overworld map history for a given location `[long,lat]`
- [x] get inventory for a player
- [x] get sticker board with a given id
- [x] get all sticker boards
- [x] claim daily drop
- [x] pin sticker
- [x] pick sticker
- [x] create custom sticker design
- [x] update user geolocation

## Get started

### Pre-requisites

- have `node >=18` installed on your machine ;
- have an Arweave wallet ; you can create one by using the [Arconnect](https://docs.arconnect.io/) web extension ;
- export the keyfile of your Arweave wallet ; paste this file in this folder and rename it `testnetwallet.json` or `wallet.json` ; **never share this file with anyone !**

### Deploy to testnet

1. build contract with `pnpm build`
2. deploy to testnet with `deploy:testnet`

### Deploy to mainnet

1. build contract with `pnpm build`
2. deploy to testnet with `deploy:mainnet`

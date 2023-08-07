This repository is a monorepo that contains the source cod of our entry to the [Arweave community hackathon](https://arweavehub.com/#/hackathon), Gommette.

- [smart contract deployed to Sonar testnet](https://sonar.warp.cc/#/app/contract/d1f97pYsNhsnVyIDWaQ0LpI7c7nZdaL4w1Doa0VKUiE?network=testnet)
- [smart contract deployed to Sonar mainnet](https://sonar.warp.cc/#/app/contract/AktpLi9jA4-CC1elBEXefqHVDzi3LZxYArs6PB6qTPs)
- Assets manifest ID: `TmxMV7ncy72eNFFoUaS1hlBMdii127hgVCxpgjEjAlo`

# About

**Gommette** is a geosocial mobile game that encourages players to explore their surroundings and connect with others through **digital stickers**. Each day, users receive a random pack of stickers with messages, which they can pin to specific geolocations. Players can pick up stickers left by others if they are physically present at that location. The game also allows users to create custom designs, contribute to the map with respawn locations, and participate in sponsored quests for unique stickers. Gommette aims to promote local exploration, foster a community-driven experience, and, in the long run, replace generic stickers with user-designed content for an ever-evolving gaming adventure :v:

## Features

- [x] Social login via Arweavekit and Othent : use your e-mail, Google account or Apple ID to sign-in ! ;
- [x] Borderless, real-time game system that will run for at least the next 100 years thanks to a Warp smart contract
  - [x] Daily sticker drop: everyday, players can claim 3 random stickers ;
  - [x] Sticker collection: players can collect their stickers in their inventory, with each sticker having a different level of rarity ;
  - [x] Pin your stickers: players can drop a sticker from their inventory on the map and pin it at their current geolocation with a message attached to it... as well as specific pick-up rules, like having to sacrifice specific stickers in specific amounts or pinning your own stickers.
  - [x] Pick stickers: players can collect the stickers pinned by other players. Collect them, pin them: it's up to you !

### Future vision

Allow the players to shape and define Gommette by :

- [ ] Designing their own stickers - ultimately, all of the genesis stickers will be used (not implemented on the frontend, implemented in the smart contract)
- [ ] Stickers design marketplace : allow users to publish their custom design on a marketplace ; this would allow users to regulate how the "terms and conditions" of how their creation could be used outside of Gommette thanks to Universal Data License ; (not implemented yet)
- [ ] History rewind : replay how the world map evolved (not implemented on the frontend, implemented in the smart contract)
- [ ] Sticker spawn locations: players will be able submit spawn locations that will spawn random stickers everyday at specific time and locations ; (not implemented yet)

## Monorepo folder structure

The main apps are located in `./apps/`. `apps/` contains the following folders :

- `pwa/` ; our PWA app - built with SolidJS and Typescript
- `warp-contract/` ; our Warp smart contract - built with Typescript ;
- `stickerboards-file-uploader` ; instructions to upload sticker boards + source for our sticker boards ;

The packages used accross our apps are located in `./packages`. `packages/` contains the following folders :

- `types/` ; shared types definitions

---

# Get started

## Setup

- pre-requisite: have `node` installed (`>=18.0.0`) ;
- Once you cloned this repository, install dependencies with `pnpm install` (or `npm install`/`yarn install`) ;

### Progressive web app (`/apps/pwa`)

Our progressive web app ; the UI we use to play.

To get started locally, make sure to :

- have an [Othent](https://othent.io) app ID (used in our `.env`) ;
- have a [Mapbox](https://mapbox.com) access token (used in our `.env`) ;
- have an [Arweave wallet](https://docs.arconnect.io) to deploy the Warp smart contract ;
- create a `.env` file in `./apps/pwa` and paste the content of `./apps/pwa/.env.dist` ; replace the values with your own ;

### Assets (`/apps/stickerboards-file-uploader`)

Allows us to upload game assets via Bundlr CLI.
All svg and vector based used were found on [SVGRepo.com](https://www.svgrepo.com/), which offers over 500k free svg icons ;
The assets used were uploaded to Arweave ; the latest manifest ID is `TmxMV7ncy72eNFFoUaS1hlBMdii127hgVCxpgjEjAlo`.

To upload game assets, make sure to :

- have an Ethereum or Arweave wallet to upload the initial game assets ;
- follow the instructions defined in `apps/stickerboards-file-uploader/README.md` ;

### Smart contract (`/apps/warp-contract`)

The logic that makes Gommette works.

To get started locally, make sure to :

- have an Arweave wallet ; you can create one by using the [Arconnect](https://docs.arconnect.io/) web extension ;
- export the keyfile of your Arweave wallet ; paste this file in `.apps/warp-contract` and rename it `testnetwallet.json` or `wallet.json` ; **never share this file with anyone !**

## Instructions

- Start and run the PWA: `pnpm dev` (or `npm dev`/`yarn dev`) ; this should print something similar to this in your terminal :

```
$ pnpm dev

> gommette@1.0.0 dev /some/absolute/path/gommette
> cd apps/pwa && pnpm dev


> gommette-pwa@0.0.0 dev /some/absolute/path/gommette/apps/pwa
> vite

http://<some-random-string>.tunnelmole.net is forwarding to localhost:3000
https://<some-random-string>.tunnelmole.net is forwarding to localhost:3000
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ ██▀▀▄▄▄ ██▄██ █ ▄▄▄▄▄ █
█ █   █ █▀███ ▀▄▀ ▀ ███ █   █ █
█ █▄▄▄█ █▄▄█▀▀▄▀█▄▀▀▄▀█ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄█ ▀▄█▄▀ █▄█ █▄▄▄▄▄▄▄█
█▄ ▀▀▀▄▄ █ █▄▀  ▀█   ▀▀█▀ ▄▀▀██
██▄  ▀▄▄ ▀▀▄█▀█ ▄ ███▄▄▀  ▀████
█ ▄▄▄█▄▄▀▄▄█▄▄▀█ ▀█▄▀█▀ █▀██▀ █
█▄▄ ▄▀▄▄▀▄█▀ ▄▄▄▄█▄██▀▄▄  ▄ █▀█
█ ██▄▀▀▄█ █▀▄  ▄  ▄▄ ▄▄▀▀▀▄ ▀▀█
█ ▄▀█▄▀▄▄▄  ▄▄▄█  ▄█▄▀▀█▄▄▄██▄█
█▄██▄██▄▄▀▀▀▀█▄ ▀▀  ▄ ▄▄▄ ▀▄▄▄█
█ ▄▄▄▄▄ █ ▄▄███ ▄███▄ █▄█ ▄▄█▀█
█ █   █ ██   ▄▀▄ ██▄▄▄ ▄ ▄ ▀█▀█
█ █▄▄▄█ █▀▄█▀▄▄ ▄██▄▀█▄▄ ▄▄ ▄▀█
█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄███▄▄▄▄███

  VITE v4.4.7  ready in 1579 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://<your-local-ip>:3000/
  ➜  press h to show help
```

You can now access the PWA in your preferred web browser using `http://localhost:3000/` ; to view it on your phone, simply flash the QRCode.

Your browser should also offer you to install the app on your machine.

- Format code: `pnpm format` (or `npm format`/`yarn format`)

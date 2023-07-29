This repository is a monorepo that contains the source cod of our entry to the [Arweave community hackathon](https://arweavehub.com/#/hackathon), Gommette.

# About

**Gommette** is a geosocial mobile game that encourages players to explore their surroundings and connect with others through **digital stickers**. Each day, users receive a random pack of stickers with messages, which they can pin to specific geolocations. Players can pick up stickers left by others if they are physically present at that location. The game also allows users to create custom designs, contribute to the map with respawn locations, and participate in sponsored quests for unique stickers. Gommette aims to promote local exploration, foster a community-driven experience, and, in the long run, replace generic stickers with user-designed content for an ever-evolving gaming adventure :v:

# Get started

## Pre-requisites

- have `node` installed (`>=18.0.0`) ;
- have an Othent app ID  (used in our `.env`) ;
- copy `./apps/pwa/.env.dist` ; replace the values with your own ;
## Setup

- Once you cloned this repository, install dependencies with `pnpm install` (or `npm install`/`yarn install`) ;

## Instructions

- Start and run the PWA: `pnpm dev` (or `npm dev`/`yarn dev`) ; this should print something similar to this in your terminal :

```
> apps-pwa@0.0.1 dev <some-absolute-path>/gommette/apps/pwa
> astro dev --host

  🚀  astro  v2.9.5 started in 122ms

  ┃ Local    http://localhost:3000/
  ┃ Network  http://<your-ip-address>:3000/
```

You can now access the PWA in your preferred web browser using `http://localhost:3000/` ; to view it on your phone, use `http://<your-ip-address>:3000/`

Your browser should also offer you to install the app on your machine

- Format code: `pnpm format` (or `npm format`/`yarn format`)

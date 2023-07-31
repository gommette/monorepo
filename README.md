This repository is a monorepo that contains the source cod of our entry to the [Arweave community hackathon](https://arweavehub.com/#/hackathon), Gommette.

# About

**Gommette** is a geosocial mobile game that encourages players to explore their surroundings and connect with others through **digital stickers**. Each day, users receive a random pack of stickers with messages, which they can pin to specific geolocations. Players can pick up stickers left by others if they are physically present at that location. The game also allows users to create custom designs, contribute to the map with respawn locations, and participate in sponsored quests for unique stickers. Gommette aims to promote local exploration, foster a community-driven experience, and, in the long run, replace generic stickers with user-designed content for an ever-evolving gaming adventure :v:

# Get started

## Pre-requisites

- have `node` installed (`>=18.0.0`) ;
- have an [Othent](https://othent.io) app ID (used in our `.env`) ;
- have a [Mapbox](https://mapbox.com) access token (used in our `.env`) ;
- copy `./apps/pwa/.env.dist` ; replace the values with your own ;

## Setup

- Once you cloned this repository, install dependencies with `pnpm install` (or `npm install`/`yarn install`) ;

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

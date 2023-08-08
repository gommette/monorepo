# rest-api

A REST API that interacts with Gommette smart contract write functions.
Bootstrapped with [`honojs/starter`](https://github.com/honojs/starter).

## Pre-requisites

- have `node >=18` installed ;
- a deployed Gommette smart contract (on either Sonar testnet or mainnet) ;

## Get started

- install dependencies with `pnpm install` (or `npm install`, `yarn install`...)
- copy `.env.dist` and paste it in `.env` ; if you deployed a new Gommette smart contract, replace the value of `GOMMETTE_CONTRACT_ID` with your own.
- paste the key of the Arweave wallet you used to deploy the Gommette smart contract in `wallet.json` ; **this file should never, ever, EVER be public.** It's omitted by `.gitignore` but double check you don't commit it by error.

Once you're all set :

- `pnpm start` will launch our server locally. It can be accessed at `localhost:8080` ;

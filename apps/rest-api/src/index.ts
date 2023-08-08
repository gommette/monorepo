import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import httpStatus from 'http-status'
import { WarpFactory } from 'warp-contracts'
import * as dotenv from 'dotenv'
import wallet from './../wallet.json'
import type { StatusCode } from 'hono/utils/http-status'

dotenv.config()

const CONTRACT_TX_ID = process.env.GOMMETTE_CONTRACT_ID
let warp
let contract
warp = WarpFactory.forTestnet()
contract = warp.contract(CONTRACT_TX_ID).connect(wallet)

/**
 * Get Gommette contract instance via Warp
 * We do this to be able to call write functions because of this error with Arweavekit
 * `Error: Signer not set correctly. If you connect wallet through 'use_wallet', please remember that it only works when bundling is disabled.`
 * This error is currently being resolved by Arweavekit.
 */
export async function getGommetteContract() {
  // use forMainnet() when interacting with mainnet contract!
  return contract
}

const app = new Hono()
let dontDoxxmeCoordinates = [14.505751, 46.056946]

app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:3000',
  }),
)
app.get('/', (c) => {
  return c.text('Hello from Hono !!')
})
app.get('/api/state', async (c) => {
  const gommette = await getGommetteContract()
  const { cachedValue } = await gommette.readState()
  return c.json({ result: cachedValue }, httpStatus.OK as StatusCode)
})
app.put('/api/player/geolocation', async (c) => {
  const gommette = await getGommetteContract()
  const { idPlayer, coordinates } = await c.req.json()
  await gommette.writeInteraction({
    function: 'updateCurrentGeolocation',
    idPlayer,
    coordinates: dontDoxxmeCoordinates,
  })
  const { cachedValue } = await gommette.readState()
  return c.json({ result: cachedValue }, httpStatus.OK as StatusCode)
})

app.post('/api/player/inventory/claim-daily-drop', async (c) => {
  const gommette = await getGommetteContract()

  const { idPlayer } = await c.req.json()
  await gommette.writeInteraction({
    function: 'claimDailyDrop',
    idPlayer,
  })
  const { cachedValue } = await gommette.readState()
  return c.json({ result: cachedValue }, httpStatus.OK as StatusCode)
})

app.put('/api/overworld/pin-sticker', async (c) => {
  const gommette = await getGommetteContract()

  const { idPlayer, idSticker, messageText, coordinates, pickupConditions } = await c.req.json()
  await gommette.writeInteraction({
    function: 'pinSticker',
    idPlayer,
    idSticker,
    messageText,
    coordinates: dontDoxxmeCoordinates,
    pickupConditions,
  })
  const { cachedValue } = await gommette.readState()
  return c.json({ result: cachedValue }, httpStatus.OK as StatusCode)
})

app.put('/api/overworld/pick-sticker', async (c) => {
  const gommette = await getGommetteContract()

  const { idPlayer, idSticker, messageText, coordinates } = await c.req.json()
  await gommette.writeInteraction({
    function: 'pickSticker',
    idSticker,
    coordinates: dontDoxxmeCoordinates,
    messageText,
    idPlayer,
  })
  const { cachedValue } = await gommette.readState()
  return c.json({ result: cachedValue }, httpStatus.OK as StatusCode)
})

serve({
  ...app,
  port: 8080,
})

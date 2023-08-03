import fs from 'fs'
import path from 'path'
import { WarpFactory } from 'warp-contracts'
import { initialStateEmpty } from './initialState'
;(async () => {
  const warp = WarpFactory.forTestnet()
  let wallet: any
  let walletDir = path.resolve('.secrets')
  let walletFilename = path.join(walletDir, `/wallet_${warp.environment}.json`)
  if (fs.existsSync(walletFilename)) {
    wallet = walletFilename
  } else {
    ;({ jwk: wallet } = await warp.generateWallet())
    if (!fs.existsSync(walletDir)) fs.mkdirSync(walletDir)
    fs.writeFileSync(walletFilename, JSON.stringify(wallet))
  }
  const contractSrc = fs.readFileSync(path.join(__dirname, '../../dist/contract.js'), 'utf8')

  console.log('Deployment started')
  const { contractTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify(initialStateEmpty),
    src: contractSrc,
  })
  console.log(
    `Deployment completed. Checkout contract in SonAr: https://sonar.warp.cc/#/app/contract/${contractTxId}?network=testnet`,
  )
})()
;``

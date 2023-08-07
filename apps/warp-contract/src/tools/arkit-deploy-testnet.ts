import { createContract } from 'arweavekit'
import { readFileSync } from 'fs'
import { initialState } from './initialState'
import path from 'path'
;async () => {
  const key = JSON.parse(readFileSync(path.join(__dirname, '../../testwallet.json')).toString())
  const contractInitialState = JSON.stringify(initialState)
  const contractSrc = readFileSync(path.join(__dirname, '../../dist/contract.js'), 'utf8')

  console.log('Deploying...')

  const contract = await createContract({
    wallet: key,
    initialState: contractInitialState,
    contractSource: contractSrc,
    environment: 'testnet',
  })

  console.log(`Deployed ! Your contract tx id is ${contract.contractTxId} `)
}

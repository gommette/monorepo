# stickerboards-file-uploader

Upload the genesis sticker boards file to Arweave using Bundlr CLI.

## Pre-requisistes
- Have a wallet (Ethereum or Arweave) ;
- Fund that wallet with network tokens (if you can) ; 

## Get started
- get wallet balance: `pnpm exec bundlr balance <your-wallet-public-key> -h <node-url> -c <currency> --provider-url <rpc-provider-url>` ;
- fund wallet: `pnpm exec bundlr fund <amount-in-atomic-unit> -h <node-url> -w <your-wallet-private-key> -c <currency> -provider-url <rpc-provider-url>` ;
- upload a folder (in our case `./stickers`): `pnpm exec bundlr upload-dir <path-to-folder> -h <node-url> -w <your-wallet-private-key> -c <currency> -provider-url <rpc-provider-url>` ;

### Example values
In the following commands, you can replace the following values :
- `<path-to-folder>`: the folder we want to upload ; in our case`./stickers`
- `<your-private-key>` the private key of wallet you want to use to pay for uploading files to Arweave. **NEVER MAKE THIS VALUE PUBLIC** ; Refer to [Bundlr docs for more information](https://docs.bundlr.network/developer-docs/sdk/connecting-node)
- `<node-url>`: The node address you’ll connect to. Example values:  `https://devnet.bundlr.network` ; `https://node2.bundlr.network` ; Refer to [Bundlr docs for more information](https://docs.bundlr.network/developer-docs/sdk/connecting-node)
- <amount-in-atomic-unit>: The amount of currency you want to send to your balance in atomic units. Example value: `25000000000` ; Refer to [Bundlr docs for more information](https://docs.bundlr.network/developer-docs/sdk/api/fund)
- `<currency>`: Currency of the underlying used network used to pay. Example value: `matic`; Refer to [Bundlr docs for more information](https://docs.bundlr.network/overview/supported-tokens)
- `<rpc-provider-url>`: A custom RPC provider. You might get an error if you don't specify one. Example value (Mumbai testnet network) `https://endpoints.omniatech.io/v1/matic/mumbai/public` ; Refer to [Bundlr docs for more information](https://docs.bundlr.network/developer-docs/sdk/connecting-node)



### Uploading a folder
Upon entering the upload command defined above, your terminal should print something similar :
```
$ pnpm exec bundlr upload-dir ./stickers -h https://devnet.bundlr.network -w <private-key> -c matic --provider-url htt
ps://endpoints.omniatech.io/v1/matic/mumbai/public

Loaded address: <your-wallet-public-address>

Checked <some-number> files...

...

? Authorize upload?

Total amount of data: 1343884 bytes over 234 files - cost: <amount in atomic units> wei (<value that can be read by us humans easily> matic)

 Y / N 
 
 y

Processed <some-number> Items

Finished processing 234 Items
Generating JSON manifest...
Uploading JSON manifest...

Done!

Uploaded to https://arweave.net/<manifest-id>

```

If the folder upload is successful : 

1. you should see something similar in your terminal ;
2. you should be able to access uploaded files by above + the file name
3. Three (3) files should have been created :
  - `<folder-name>.txt` ; this file contains two values, one of which called `"id"`: this is our folder upload **manifest identifier**, which we use to access our file like so : `https://arweave.net/<manifest-id>/<file-name>` ; for instance [https://arweave.net/TmxMV7ncy72eNFFoUaS1hlBMdii127hgVCxpgjEjAlo/alien-svgrepo-com.svg]
  - `<folder-name>-manifest.csv` 
  -  `<folder-name>-manifest.json`; 


For more information, [refer to the Bundlr documentation about folder upload](https://docs.bundlr.network/developer-docs/cli/uploading-a-folder)

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { VitePWA, type ManifestOptions, type VitePWAOptions } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'
import { tunnelmole } from 'tunnelmole'
import qrcode from 'qrcode-terminal'

const hostPort = 3000
const hostUrl = await tunnelmole({
  port: hostPort,
})

qrcode.generate(hostUrl, { small: true })

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Gommette',
    short_name: 'Gommette',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims) pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
    target: 'esnext',
  },
  preview: {
    host: hostUrl,
  },
  optimizeDeps: { include: ['mapbox-gl'] },
  server: {
    port: hostPort,
    host: true,
  },
  plugins: [
    /* 
      Uncomment the following line to enable solid-devtools.
      For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
})

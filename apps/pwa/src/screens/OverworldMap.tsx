import 'mapbox-gl/dist/mapbox-gl.css'
import { createGeolocation } from '@solid-primitives/geolocation'
import { createMutationObserver } from '@solid-primitives/mutation-observer'
import MapGL, { Viewport, Control, Marker } from 'solid-map-gl'
import { For, Show, createEffect, createSignal } from 'solid-js'
import type { Accessor, Setter, Component, Resource } from 'solid-js'
import { BiRegularNotification } from 'solid-icons/bi'
import { IoGridOutline } from 'solid-icons/io'
import { AiOutlinePushpin } from 'solid-icons/ai'
import { HiOutlinePaintBrush } from 'solid-icons/hi'
import { Loader } from '../components'
import {
  DialogClaimDailyDrop,
  DialogInventory,
  DialogPickSticker,
  DialogPinSticker,
  useAuthentication,
  useDictionary,
  useGommette,
} from '../features'
import { resolveUri } from '../helpers'
import type { Sticker } from '@gommette/types'
import { DialogCreateDesign } from '../features/create-design'

const dictionary = {
  en: {
    dialogTrigger_ClaimDailyDrop_label: 'Daily drop',
    dialogTrigger_Inventory_label: 'My inventory',
    dialogTrigger_PinSticker_label: 'Pin',
    dialogTrigger_CreateDesign_label: 'Create design',
  },
}
const [t] = useDictionary(dictionary)

/**
 * Wrapper for a Mapbox map ;
 * Gets the geolocation of the user then displays the map ;
 * Fallback displays a loader
 */
export const OverworldMap: Component = () => {
  const [location] = createGeolocation()
  const [viewport, setViewport] = createSignal({} as Viewport)
  const { storeAuthentication } = useAuthentication()
  const { mutationUpdatePlayerGeolocation } = useGommette()

  createEffect(async () => {
    if (location()?.latitude && location()?.longitude && storeAuthentication.walletAddress) {
      const long = location()?.longitude
      const lat = location()?.latitude

      setViewport({
        zoom: 15,
        center: [long, lat],
      })

      // update current user geolocation in Gommette state
      await mutationUpdatePlayerGeolocation.mutateAsync({ coordinates: [location().longitude, location().latitude] })
    }
  })

  return (
    <>
      <Show
        fallback={
          <div class="flex items-center justify-center bg-complementary-2">
            <Loader isVisible={location()?.longitude && location()?.latitude ? true : false} />
          </div>
        }
        when={location()?.longitude && location()?.latitude}
      >
        <Map viewport={viewport} setViewport={setViewport} location={location} />
      </Show>
    </>
  )
}

interface MapProps {
  viewport: Accessor<Viewport>
  setViewport: Setter<Viewport>
  location: Resource<GeolocationCoordinates>
}
/**
 * Mapbox map
 */
const Map = (props: MapProps) => {
  let refMapboxWrapper
  let refDialogPinSticker
  let refDialogCreateDesign
  let refDialogInventory
  let refDialogPinnedStickerDetails
  let refDialogClaimDailyDrop
  const [viewingPinnedSticker, setViewingPinnedSticker] = createSignal<null | Sticker>(null)
  const [isGeolocationControlHidden] = createSignal(false)
  const { queryCurrentOverworld, queryStickerBoards } = useGommette()

  const [, { stop }] = createMutationObserver(
    () => refMapboxWrapper,
    { attributes: true, subtree: true },
    (records) => {
      const controlGeolocation = records.filter((record) => {
        //@ts-ignore
        if (record.target?.className === 'mapboxgl-ctrl-geolocate') return record
      })
      if (isGeolocationControlHidden() === false) {
        const el = controlGeolocation[0]?.target
        if (el) {
          //@ts-ignore
          el?.click()
        }
      }
    },
  )

  createEffect(() => {
    if (isGeolocationControlHidden() === true) stop()
  })

  return (
    <>
      <div class="z-10 fixed border border-neutral-6 inset-0 flex items-end justify-center pb-12 pointer-events-none w-full">
        <div class="bg-neutral-1 pointer-events-auto grid grid-cols-4 gap-6 shadow-xl rounded-xl px-3 pb-0.25  pt-1.5">
          <button
            onClick={() => refDialogInventory.click()}
            class="flex flex-col leading-loose items-center justify-center aspect-square"
          >
            <IoGridOutline size={20} />
            <span class="text-2xs text-neutral-11">{t.dialogTrigger_Inventory_label()}</span>
          </button>
          <button
            onClick={() => refDialogPinSticker.click()}
            class="flex flex-col leading-loose items-center justify-center aspect-square"
          >
            <AiOutlinePushpin size={24} />
            <span class="text-2xs text-neutral-11">{t.dialogTrigger_PinSticker_label()}</span>
          </button>
          <button
            onClick={() => refDialogClaimDailyDrop.click()}
            class="flex flex-col leading-loose items-center justify-center aspect-square"
          >
            <BiRegularNotification size={24} />
            <span class="text-2xs text-neutral-11">{t.dialogTrigger_ClaimDailyDrop_label()}</span>
          </button>
          <button
            class="flex flex-col leading-loose items-center justify-center aspect-square"
            onClick={() => refDialogCreateDesign.click()}
          >
            <HiOutlinePaintBrush size={24} />
            <span class="text-2xs text-neutral-11">{t.dialogTrigger_CreateDesign_label()}</span>
          </button>
        </div>
      </div>
      <div ref={refMapboxWrapper}>
        <MapGL
          options={{
            style: 'mb:light',
            attribution: false,
          }}
          viewport={props.viewport()}
          onViewportChange={(evt: Viewport) => {
            props.setViewport(evt)
          }}
        >
          <Show
            when={
              queryCurrentOverworld?.data?.overworldMap &&
              Object.keys(queryCurrentOverworld?.data?.overworldMap).length > 0
            }
          >
            <For each={Object.keys(queryCurrentOverworld?.data?.overworldMap)}>
              {(coordinates) => {
                const sticker: Sticker = queryCurrentOverworld?.data?.overworldMap[coordinates]
                const uriSticker = resolveUri(queryStickerBoards?.data?.stickerBoards?.[sticker?.idStickerBoard]?.uri)
                return (
                  <Marker
                    lngLat={coordinates.split(',')}
                    options={{
                      element: (
                        <button
                          onClick={() => {
                            setViewingPinnedSticker(sticker)
                            refDialogPinnedStickerDetails.click()
                          }}
                        >
                          <img class="w-7" src={uriSticker} />
                        </button>
                      ),
                    }}
                  />
                )
              }}
            </For>
          </Show>

          <Control
            options={{
              trackUserLocation: true,
              showUserHeading: true,
              positionOptions: {
                enableHighAccuracy: true,
              },
            }}
            position="top-right"
            type="geolocate"
          />
        </MapGL>
      </div>
      <DialogPickSticker sticker={viewingPinnedSticker} ref={refDialogPinnedStickerDetails} />
      <DialogInventory ref={refDialogInventory} />
      <DialogPinSticker ref={refDialogPinSticker} />
      <DialogClaimDailyDrop ref={refDialogClaimDailyDrop} />
      <DialogCreateDesign ref={refDialogCreateDesign} />
    </>
  )
}
export default OverworldMap

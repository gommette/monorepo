import 'mapbox-gl/dist/mapbox-gl.css'
import { createGeolocation } from '@solid-primitives/geolocation'
import { createMutationObserver } from '@solid-primitives/mutation-observer'
import MapGL, { Viewport, Control, Marker } from 'solid-map-gl'
import { For, Show, createEffect, createSignal } from 'solid-js'
import type { Accessor, Setter, Component, Resource } from 'solid-js'
import { RiCommunicationEmojiStickerFill } from 'solid-icons/ri'
import { Loader, Dialog as DialogDrawerBody, Button, callToAction } from '../components'
import { Dialog, DialogTitle, DialogTrigger } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import { useDictionary } from '../features'
import { resolveUri } from '../helpers'

const appState = {}
const dictionary = {
  en: {
    callToAction_PickPinnedSticker_label: 'Pick up',
    callToAction_ViewPinnedSticker_label: 'Pinned sticker details',
    link_OpenDirectionOnMaps_Label: 'Open directions on Maps',
    details_PinnedBy_text: ({ author }: { author: string }) => `Pinned by ${author}`,
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

  createEffect(() => {
    if (location()?.latitude && location()?.longitude) {
      setViewport({
        zoom: 15,
        center: [location()?.longitude, location()?.latitude],
      })
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
  let refDialogPinnedStickerDetails
  const [viewingSticker, setViewingSticker] = createSignal(null)
  const [isGeolocationControlHidden] = createSignal(false)
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
        <div class="bg-neutral-1 w-3/4 shadow-xl rounded-lg p-6">
          <RiCommunicationEmojiStickerFill />
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
          <For each={Object.keys(appState?.overworldMap?.current)}>
            {(coordinates) => {
              const sticker = appState?.overworldMap.current[coordinates]
              const uriSticker = resolveUri(appState?.stickerBoards[sticker.idStickerBoard].uri)

              return (
                <Marker
                  lngLat={coordinates.split(',')}
                  options={{
                    element: (
                      <button
                        onClick={() => {
                          setViewingSticker(sticker)
                          refDialogPinnedStickerDetails.click()
                        }}
                      >
                        <img class="w-5" src={uriSticker} />
                      </button>
                    ),
                  }}
                />
              )
            }}
          </For>

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
      <Dialog>
        {(state) => (
          <>
            <DialogTrigger ref={refDialogPinnedStickerDetails} class="sr-only">
              {t.callToAction_PickPinnedSticker_label()}
            </DialogTrigger>

            <Portal>
              <DialogDrawerBody isOpen={state().isOpen} class="flex flex-col  max-h-[90dvh] overflow-y-auto">
                <div class="w-full pt-6">
                  <div class="flex items-center gap-3 flex-col-reverse">
                    <DialogTitle class="text-neutral-11 text-xs">
                      {viewingSticker()?.id} - {appState?.stickerBoards[viewingSticker()?.idStickerBoard].name}
                    </DialogTitle>
                    <div class="px-6">
                      <section>
                        <img
                          alt={appState?.stickerBoards[viewingSticker()?.idStickerBoard].name}
                          class="animate-revolve w-24"
                          src={resolveUri(appState?.stickerBoards[viewingSticker()?.idStickerBoard].uri)}
                        />
                      </section>
                    </div>
                  </div>
                  <section class="grid py-3 border-b border-b-neutral-5 px-6 gap-1.5">
                    <Button class="text-sm inline-flex items-center justify-center">
                      {t.callToAction_PickPinnedSticker_label()}
                    </Button>
                    <a
                      class={callToAction({
                        intent: 'primary-ghost',
                        class: 'text-xs inline-flex items-center justify-center',
                      })}
                      target="_blank"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${
                        viewingSticker().message.coordinates[1]
                      },${viewingSticker().message.coordinates[0]}`}
                    >
                      {t.link_OpenDirectionOnMaps_Label()}
                    </a>
                  </section>
                  <section class="max-w-prose px-6 pt-3 pb-6 mx-auto">
                    <p class="text-metal-11 pb-1.5 text-xs text-center">
                      {t.details_PinnedBy_text({
                        author: viewingSticker().message.author,
                      })}
                    </p>
                    <p class="text-primary-neutral-12 italic">{viewingSticker().message.text}</p>
                  </section>
                </div>
              </DialogDrawerBody>
            </Portal>
          </>
        )}
      </Dialog>
    </>
  )
}
export default OverworldMap

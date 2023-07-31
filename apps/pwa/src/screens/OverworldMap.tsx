import 'mapbox-gl/dist/mapbox-gl.css'
import { createGeolocation } from '@solid-primitives/geolocation'
import { createMutationObserver } from '@solid-primitives/mutation-observer'
import MapGL, { Viewport, Control } from 'solid-map-gl'
import { Show, createEffect, createSignal } from 'solid-js'
import { RiCommunicationEmojiStickerFill } from 'solid-icons/ri'
import { Loader } from '../components'

export const OverworldMap = () => {
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

const Map = (props) => {
  let ref
  const [isGeolocationControlHidden] = createSignal(false)
  const [, { stop }] = createMutationObserver(
    () => ref,
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

      <div ref={ref}>
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
    </>
  )
}
export default OverworldMap

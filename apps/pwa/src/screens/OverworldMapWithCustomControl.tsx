import 'mapbox-gl/dist/mapbox-gl.css'
import { createGeolocation } from '@solid-primitives/geolocation'
import { createMutationObserver } from '@solid-primitives/mutation-observer'
import MapGL, { Viewport, Control } from 'solid-map-gl'
import { Show, createEffect, createSignal } from 'solid-js'
import { TbCurrentLocation } from 'solid-icons/tb'
import { Loader } from '../components'

export const OverworldMapWithCustomControl = () => {
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
  const [isGeolocationControlHidden, setIsGeolocationControlHidden] = createSignal(false)
  const [geolocationControl, setGeolocationControl] = createSignal()
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
        const wrapper = el?.parentElement
        if (wrapper && el) {
          wrapper.classList.add('opacity-0')
          //@ts-ignore
          el?.click()
          setGeolocationControl(el)
          setIsGeolocationControlHidden(true)
        }
      }
    },
  )

  createEffect(() => {
    if (isGeolocationControlHidden() === true) stop()
  })
  return (
    <>
      <button
        onClick={() => {
          //@ts-ignore
          geolocationControl()?.click()
        }}
        class="fixed left-1/2 -translate-y-1/2 shadow-xl bottom-20 pointer-events-all z-10 text-xl rounded-lg w-10  h-10  flex items-center justify-center bg-neutral-1 text-neutral-11"
      >
        <TbCurrentLocation />
      </button>

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
            type="geolocate"
          />
        </MapGL>
      </div>
    </>
  )
}
export default OverworldMapWithCustomControl

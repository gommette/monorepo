import { Match, Switch } from 'solid-js'
import OverworldMap from '../screens/OverworldMap'
import { Button, Loader } from '../components'
import { useGeolocationPermission } from '../features'
import AppOverlay from '../screens/AppOverlay'

export default function App() {
  const { stateGeolocationPermission, mutationGrantGeolocationPermission } = useGeolocationPermission()
  return (
    <main
      classList={{
        'min-h-[100dvh] pt-16': stateGeolocationPermission() !== 'granted',
      }}
      class="flex flex-col bg-complementary-2"
    >
      <AppOverlay />
      <Switch fallback={<Loader isVisible={stateGeolocationPermission() === 'unknown'} />}>
        <Match when={stateGeolocationPermission() === 'granted'}>
          <OverworldMap />
        </Match>

        <Match when={stateGeolocationPermission() !== 'granted'}>
          <Switch>
            <Match when={mutationGrantGeolocationPermission.status !== 'loading'}>
              <div class="px-3 flex flex-col my-auto">
                <p class="pb-3 text-lg text-center text-primary-11">Activate geolocation to unlock the map</p>
                <Button
                  isLoading={mutationGrantGeolocationPermission.status === 'loading'}
                  disabled={mutationGrantGeolocationPermission.status === 'loading'}
                  onClick={async () => {
                    mutationGrantGeolocationPermission.mutateAsync()
                  }}
                >
                  give access please !
                </Button>
              </div>
            </Match>
          </Switch>
        </Match>
      </Switch>
    </main>
  )
}

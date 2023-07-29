import { Match, Show, Switch } from 'solid-js'
import { Button } from '../components'
import { type Dictionary, useDictionary, useAuthentication } from '../features'
const dictionary = {
  en: {
    headline: 'Collect, connect, create !',
    text: 'Embark on a new adventure with Gommette and turn the world into your playground!',
    callToAction: 'Start exploring',
    mutationSignInPending: 'Continue with...',
  },
}
export const Landing = () => {
  const [t] = useDictionary(dictionary)
  const { mutationSignIn, mutationCurrentUser } = useAuthentication()
  return (
    <>
      <main class="flex-grow flex flex-col pb-3 pt-6 px-3 bg-complementary-2">
        <Show when={mutationCurrentUser.status === 'loading'}>
          <span class="relative mx-auto flex h-6 w-6">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-complementary-10 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-6 w-6 bg-complementary-6"></span>
          </span>
        </Show>
        <div class="mt-auto pb-6">
          <p class="font-bold text-9xl leading-none pb-6 text-primary-9">
            <span class="text-primary-12 text-xs">{t.headline()}</span>
            <br /> Gommette{' '}
          </p>
          <p class="text-lg text-primary-neutral-11">{t.text()}</p>
        </div>
        <Button onClick={async () => mutationSignIn.mutateAsync()} class="text-base">
          <Switch fallback={t.callToAction()}>
            <Match when={mutationSignIn.status === 'loading'}>{t.mutationSignInPending()}</Match>
          </Switch>
        </Button>
      </main>
    </>
  )
}

export default Landing

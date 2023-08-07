import { Match, Switch } from 'solid-js'
import { useDictionary, useAuthentication } from '../features'
import { Button, Loader } from '../components'

const dictionary = {
  en: {
    headline: 'Collect, connect, create !',
    text: 'Embark on a new adventure with Gommette and turn the world into your playground!',
    callToAction: 'Start exploring',
    mutationSignInPending: 'Continue with...',
  },
}
const [t] = useDictionary(dictionary)

export const Landing = () => {
  const { mutationSignIn, mutationCurrentUser } = useAuthentication()

  return (
    <>
      <main class="flex-grow flex flex-col pb-3 pt-6 px-3 bg-complementary-2">
        <Loader isVisible={mutationCurrentUser.status === 'loading'} />
        <div class="mt-auto pb-6">
          <p class="font-bold text-9xl leading-none pb-6 text-primary-9">
            <span class="text-primary-12 text-xs">{t?.headline()}</span>
            <br /> Gommette{' '}
          </p>
          <p class="text-lg text-primary-neutral-11">{t?.text()}</p>
        </div>

        <Button
          isLoading={mutationSignIn.status === 'loading'}
          onClick={async () => mutationSignIn.mutateAsync()}
          class="text-base inline-flex justify-center"
        >
          <Switch fallback={t?.callToAction()}>
            <Match when={mutationSignIn.status === 'loading'}>&nbsp;</Match>
          </Switch>
        </Button>
      </main>
    </>
  )
}

export default Landing

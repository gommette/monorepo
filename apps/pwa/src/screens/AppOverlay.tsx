import { useAuthentication } from '../features'
import { Avatar, AvatarFallback, AvatarImage, DialogTitle } from '@ark-ui/solid'
import { Dialog, DialogTrigger } from '@ark-ui/solid'
import { Dialog as DialogDrawerBody } from '../components'
import { Portal } from 'solid-js/web'

export const AppOverlay = () => {
  const { storeAuthentication, mutationSignOut } = useAuthentication()
  return (
    <>
      <Dialog>
        {(state) => (
          <>
            <DialogTrigger>
              <img
                class="w-10 ring-2 ring-primary-neutral-8 shadow-lg ring-offset-2 h-10 block fixed rounded-full z-10 end-3 top-3"
                alt={storeAuthentication?.profile?.nickname}
                src={storeAuthentication?.profile?.picture}
              />
            </DialogTrigger>
            <Portal>
              <DialogDrawerBody isOpen={state().isOpen} class="flex flex-col  max-h-[90dvh] overflow-y-auto">
                <DialogTitle class="w-full sticky top-0 bg-neutral-2 border-b border-neutral-5 text-primary-neutral-12 pt-1.5 leading-relaxed px-3 font-bold text-lg">
                  Your account
                </DialogTitle>
                <div class="w-full pb-6 pt-6 px-3">
                  <section>
                    <div class="flex gap-x-3">
                      <Avatar class="w-8">
                        <AvatarFallback class="rounded-full">{storeAuthentication?.profile?.nickname}</AvatarFallback>
                        <AvatarImage class="rounded-full" src={storeAuthentication?.profile?.picture} alt="avatar" />
                      </Avatar>
                      <div class="overflow-hidden">
                        <p class="font-bold">{storeAuthentication?.profile?.fullname}</p>
                        <p class="text-xs text-metal-11">{storeAuthentication?.profile?.email}</p>
                        <p class="pb-3 overflow-hidden text-neutral-11 whitespace-nowrap text-ellipsis text-[0.725em]">
                          {storeAuthentication?.walletAddress}
                        </p>
                        <button
                          disabled={mutationSignOut.status === 'loading'}
                          onClick={() => mutationSignOut.mutate()}
                          class="text-primary-11"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </section>
                  <section></section>
                </div>
              </DialogDrawerBody>
            </Portal>
          </>
        )}
      </Dialog>
    </>
  )
}

export default AppOverlay

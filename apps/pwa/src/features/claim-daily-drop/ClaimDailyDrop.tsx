import { Dialog, DialogTrigger, DialogTitle } from '@ark-ui/solid'
import { Match, Portal, Switch } from 'solid-js/web'
import { Loader, Dialog as DialogDrawerBody, Button } from '../../components'
import { useDictionary } from '../internationalization'
import { useGommette } from '../gommette'
import { isToday } from 'date-fns'

const dictionary = {
  en: {
    dialogTrigger_label: 'Claim my daily stickers drop',
    dialogTitle_label: 'Claim my daily stickers',
    callToAction_ClaimDailyDrop_label: 'Get my stickers',
    callToAction_GoBack_label: 'Back to map',
    paragraph_AlreadyClaimedToday_text: 'You can only claim your free daily drop once per day.',
    paragraph_ExplainDailyDrop_text: 'You can claim 3 stickers every day.',
  },
}
const [t] = useDictionary(dictionary)

interface DialogClaimDailyDropProps {
  ref: HTMLButtonElement | ((el: HTMLButtonElement) => void)
}
export const DialogClaimDailyDrop = (props: DialogClaimDailyDropProps) => {
  const { queryPlayer } = useGommette()
  return (
    <Dialog>
      {(state) => (
        <>
          <DialogTrigger ref={props.ref} class="sr-only">
            {t.dialogTrigger_label()}
          </DialogTrigger>

          <Portal>
            <DialogDrawerBody isOpen={state().isOpen} class="flex flex-col min-h-[33dvh] max-h-[90dvh] overflow-y-auto">
              <DialogTitle class="w-full sticky top-0 bg-neutral-2 border-b border-neutral-5 text-primary-neutral-12 pt-1.5 leading-relaxed px-3 font-bold text-lg">
                {t.dialogTitle_label()}
              </DialogTitle>

              <div class="w-full flex flex-col py-6 px-3">
                <p class="pb-6 text-primary-neutral-11 text-center">{t.paragraph_ExplainDailyDrop_text()}</p>

                <Switch>
                  <Match when={queryPlayer.status === 'loading'}>
                    <Loader isVisible={queryPlayer.status === 'loading'} />
                  </Match>
                  <Match
                    when={
                      !queryPlayer?.data?.player?.claimedDailyDropAt ||
                      isToday(queryPlayer?.data?.player?.claimedDailyDropAt)
                    }
                  >
                    <section class="w-full flex flex-col text-primary-neutral-11">
                      <Button class="mx-auto">{t.callToAction_ClaimDailyDrop_label()}</Button>
                    </section>
                    <Button
                      intent="primary-ghost"
                      class="text-xs w-full mt-6 inline-flex items-center justify-center"
                      {...state().closeTriggerProps}
                    >
                      {t.callToAction_GoBack_label()}
                    </Button>
                  </Match>

                  <Match when={!isToday(queryPlayer?.data?.player?.claimedDailyDropAt)}>
                    <section class="py-3 px-6 rounded bg-primary-neutral-3 border border-primary-neutral-6 text-primary-neutral-11">
                      <p>{t.paragraph_AlreadyClaimedToday_text()}</p>
                    </section>
                  </Match>
                </Switch>
              </div>
            </DialogDrawerBody>
          </Portal>
        </>
      )}
    </Dialog>
  )
}

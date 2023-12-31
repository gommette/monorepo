import { Dialog, DialogTrigger, DialogTitle } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import { createForm } from '@felte/solid'
import { Loader, Dialog as DialogDrawerBody, Button, FormTextarea } from '../../components'
import { useDictionary } from '../internationalization'
import type { PlayerInventory, Sticker } from '@gommette/types'
import { createSignal, For, Switch, Match, createEffect } from 'solid-js'
import { useGommette } from '../gommette'
import { resolveUri } from '../../helpers'
import { createGeolocation } from '@solid-primitives/geolocation'

const dictionary = {
  en: {
    dialogTrigger_label: 'Pin a sticker',
    dialogTitle_label: 'Pin a sticker on the map',
    callToAction_label: 'Pin to map',
    form_PickSticker_label: 'Pick a sticker',
    form_InputMessage_label: 'Your message',
    paragraph_EmptyInventory_text: "You don't have any stickers in your inventory yet.",
    callToAction_GoBack_label: 'Back to map',
  },
}
const [t] = useDictionary(dictionary)

interface DialogPinStickerProps {
  ref: HTMLButtonElement | ((el: HTMLButtonElement) => void)
  inventory?: PlayerInventory
}
export const DialogPinSticker = (props: DialogPinStickerProps) => {
  const [location] = createGeolocation()
  const [stickerToPin, setStickerToPin] = createSignal<null | Sticker>(null)
  const { queryPlayer, queryStickerBoards, mutationPinSticker } = useGommette()
  const { form, data, setData } = createForm({
    onSubmit: async (values) => {
      await mutationPinSticker.mutateAsync({
        idSticker: values.sticker,
        messageText: values.message,
        coordinates: [location().longitude, location().latitude],
        pickupConditions: {
          conditionType: 'FREE', // hardcoded for now, running out of time !
        },
      })
    },
  })

  createEffect(() => {
    console.log('queryPlayer?.data?.player?.inventory', queryPlayer?.data?.player?.inventory)
  })
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
                <Switch>
                  <Match when={queryPlayer?.status === 'loading'}>
                    <Loader isVisible={queryPlayer?.status === 'loading'} />
                  </Match>
                  <Match when={queryPlayer?.data?.player?.inventory?.length === 0}>
                    <section class="py-3 px-6 rounded bg-primary-neutral-3 border border-primary-neutral-6 text-primary-neutral-11">
                      <p>{t.paragraph_EmptyInventory_text()}</p>
                    </section>

                    <Button
                      intent="primary-ghost"
                      class="text-xs w-full mt-6 inline-flex items-center justify-center"
                      {...state().closeTriggerProps}
                    >
                      {t.callToAction_GoBack_label()}
                    </Button>
                  </Match>
                  <Match when={queryPlayer?.data?.player?.inventory?.length > 0}>
                    {/* @ts-ignore */}
                    <form use:form class="gap-6 flex flex-col">
                      <fieldset>
                        <legend class="pb-3 text-sm text-metal-11">{t.form_PickSticker_label()}</legend>

                        <div class="grid grid-cols-3 sm:grid-cols-4 gap-8">
                          <For each={queryPlayer?.data?.player?.inventory}>
                            {(sticker) => {
                              const boards = queryStickerBoards?.data?.stickerBoards
                              return (
                                <div class="relative h-24 p-2 rounded  [&:has(:checked)]:bg-complementary-3 [&:has(:checked)]:ring-4 ring-complementary-7">
                                  <input
                                    class="absolute z-10 opacity-0 block inset-0 w-full h-full"
                                    type="radio"
                                    value={sticker.id}
                                    name="sticker"
                                  />
                                  <img
                                    alt={boards?.[sticker.idStickerBoard]?.name}
                                    class="h-full object-contain"
                                    src={resolveUri(boards?.[sticker.idStickerBoard]?.uri)}
                                  />
                                </div>
                              )
                            }}
                          </For>
                        </div>
                      </fieldset>
                      <fieldset>
                        <div class="flex flex-col">
                          <label class="text-sm text-metal-11" for="message">
                            {t.form_InputMessage_label()}
                          </label>
                          <FormTextarea hasError={false} class="w-full" name="message" />
                        </div>
                      </fieldset>
                      <Button
                        isLoading={mutationPinSticker.isLoading}
                        disabled={mutationPinSticker.isLoading}
                        class="w-full inline-flex justify-center items-center"
                      >
                        {t.callToAction_label()}
                      </Button>
                    </form>
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

import { Dialog, DialogTrigger, DialogTitle } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import { Loader, Dialog as DialogDrawerBody, Button, callToAction } from '../../components'
import { useDictionary } from '../internationalization'
import { useGommette } from '../gommette'
import type { Sticker } from '@gommette/types'
import { type Accessor, Show } from 'solid-js'
import { resolveUri } from '../../helpers'
import { createGeolocation } from '@solid-primitives/geolocation'

const dictionary = {
  en: {
    dialogTrigger_label: 'Pick this sticker',
    link_OpenDirectionOnMaps_Label: 'Open directions on Maps',
    details_PinnedBy_text: ({ author }: { author: string }) => `Pinned by ${author}`,
    callToAction_GoBack_label: 'Back to map',
  },
}

const [t] = useDictionary(dictionary)

interface DialogPickStickerProps {
  ref: HTMLButtonElement | ((el: HTMLButtonElement) => void)
  sticker: Accessor<Sticker>
}
export const DialogPickSticker = (props: DialogPickStickerProps) => {
  const { queryStickerBoards, mutationPickSticker } = useGommette()
  const [location] = createGeolocation()
  return (
    <Dialog>
      {(state) => (
        <>
          <DialogTrigger ref={props.ref} class="sr-only">
            {t.dialogTrigger_label()}
          </DialogTrigger>

          <Portal>
            <DialogDrawerBody isOpen={state().isOpen} class="flex flex-col max-h-[90dvh] overflow-y-auto">
              <Show when={props.sticker()?.id}>
                <div class="w-full py-6">
                  <div class="flex items-center gap-3 flex-col-reverse">
                    <DialogTitle class="text-neutral-11 text-xs">
                      {props.sticker()?.id} -{' '}
                      {queryStickerBoards?.data?.stickerBoards?.[props.sticker()?.idStickerBoard].name}
                    </DialogTitle>
                    <div class="px-6">
                      <section>
                        <img
                          alt={queryStickerBoards?.data?.stickerBoards?.[props.sticker()?.idStickerBoard].name}
                          class="animate-revolve w-24"
                          src={resolveUri(
                            queryStickerBoards?.data?.stickerBoards?.[props.sticker()?.idStickerBoard].uri,
                          )}
                        />
                      </section>
                    </div>
                  </div>
                  <section class="grid py-3 border-b border-b-neutral-5 px-6 gap-1.5">
                    <Button
                      isLoading={mutationPickSticker.isLoading}
                      disabled={mutationPickSticker.isLoading}
                      onClick={async () => {
                        await mutationPickSticker.mutateAsync({
                          idSticker: props.sticker().id,
                          coordinates: [location().longitude, location().latitude],
                          messageText: '',
                        })
                      }}
                      class="text-sm inline-flex items-center justify-center"
                    >
                      {t.dialogTrigger_label()}
                    </Button>
                    <a
                      class={callToAction({
                        intent: 'primary-ghost',
                        class: 'text-xs inline-flex items-center justify-center',
                      })}
                      target="_blank"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${
                        props.sticker().message.coordinates[1]
                      },${props.sticker().message.coordinates[0]}`}
                    >
                      {t.link_OpenDirectionOnMaps_Label()}
                    </a>
                  </section>
                  <section class="max-w-prose px-6 pt-3 pb-6 mx-auto">
                    <p class="text-metal-11 overflow-hidden text-ellipsis pb-1.5 text-xs text-center">
                      {t.details_PinnedBy_text({
                        author: props.sticker().message.author,
                      })}
                    </p>
                    <p class="text-primary-neutral-12 italic">{props.sticker().message.text}</p>
                  </section>
                  <Button
                    intent="primary-ghost"
                    class="text-xs w-full inline-flex items-center justify-center"
                    {...state().closeTriggerProps}
                  >
                    {t.callToAction_GoBack_label()}
                  </Button>
                </div>
              </Show>
            </DialogDrawerBody>
          </Portal>
        </>
      )}
    </Dialog>
  )
}

import { Dialog, DialogTrigger, DialogTitle } from '@ark-ui/solid'
import { Portal, Switch, Match } from 'solid-js/web'
import { Loader, Dialog as DialogDrawerBody, Button, callToAction } from '../../components'
import { useDictionary } from '../internationalization'
import { useGommette } from '../gommette'
import { Show, type Accessor, type Setter, For } from 'solid-js'
import type { Sticker } from '@gommette/types'
import { resolveUri } from '../../helpers'

const dictionary = {
  en: {
    dialogTrigger_label: 'My inventory',
    dialogTitle_label: 'My inventory',
    dialogPinSticker_label: 'Pin sticker',
    callToAction_PinSticker_label: 'Pin to map',
    callToAction_SelectStickerToPin_label: 'Select a sticker to pin',
    callToAction_ViewPinnedSticker_label: 'Pinned sticker details',
    callToAction_GoBack_label: 'Back to map',
    link_OpenDirectionOnMaps_Label: 'Open directions on Maps',
    paragraph_EmptyInventory_text: "You don't have any stickers in your inventory yet.",
    details_PinnedBy_text: ({ author }: { author: string }) => `Pinned by ${author}`,
  },
}
const [t] = useDictionary(dictionary)

interface InventoryProps {
  selectedSticker?: Accessor<Sticker>
  setSelectedSticker?: Setter<Sticker>
}
export const Inventory = (props: InventoryProps) => {
  const { queryPlayer, queryStickerBoards } = useGommette()

  return (
    <Switch>
      <Match when={queryPlayer?.status === 'loading'}>
        <Loader isVisible={queryPlayer?.status === 'loading'} />
      </Match>
      <Match when={queryPlayer?.data?.player?.inventory?.length === 0}>
        <section class="py-3 px-6 rounded bg-primary-neutral-3 border border-primary-neutral-6 text-primary-neutral-11">
          <p>{t.paragraph_EmptyInventory_text()}</p>
        </section>
      </Match>
      <Match when={queryPlayer?.data?.player?.inventory?.length > 0}>
        <section>
          <ul class="grid grid-cols-3 sm:grid-cols-4 gap-8">
            <For each={Object.keys(queryPlayer?.data?.player?.inventoryWithAmount)}>
              {(board) => {
                const boards = queryStickerBoards?.data?.stickerBoards
                return (
                  <li class="relative p-2 text-center">
                    <div class="h-24">
                      <img
                        alt={boards?.[board]?.name}
                        class="h-full object-contain"
                        src={`https://arweave.net/${board}`}
                      />
                    </div>
                    <p class="text-sm text-neutral-11">{boards?.[board]?.name}</p>
                    <p class="text-xs text-metal-11">x{queryPlayer?.data?.player?.inventoryWithAmount[board]}</p>
                  </li>
                )
              }}
            </For>
          </ul>
        </section>
      </Match>
    </Switch>
  )
}

interface DialogInventoryProps {
  ref: HTMLButtonElement | ((el: HTMLButtonElement) => void)
}
export const DialogInventory = (props: DialogInventoryProps) => {
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
              <div class="w-full flex flex-col pt-6 pb-9 px-3">
                <div class="pb-6">
                  <Inventory />
                </div>
                <Button
                  intent="primary-ghost"
                  class="text-xs w-full inline-flex items-center justify-center"
                  {...state().closeTriggerProps}
                >
                  {t.callToAction_GoBack_label()}
                </Button>
              </div>
            </DialogDrawerBody>
          </Portal>
        </>
      )}
    </Dialog>
  )
}

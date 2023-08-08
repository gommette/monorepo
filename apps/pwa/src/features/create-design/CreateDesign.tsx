import { Dialog, DialogTrigger, DialogTitle } from '@ark-ui/solid'
import { Portal, Show } from 'solid-js/web'
import { TbSticker } from 'solid-icons/tb'
import { Loader, Dialog as DialogDrawerBody, Button, FormInput } from '../../components'
import { useDictionary } from '../internationalization'
import { createForm } from '@felte/solid'
import { createMutation } from '@tanstack/solid-query'

const dictionary = {
  en: {
    dialogTrigger_label: 'Create a custom sticker',
    dialogTitle_label: 'Create a custom sticker',
    callToAction_label: 'Create my design !',
    form_StickerCollectionName_label: 'Your design name',
    form_StickerCollectionAmount_label: 'Amount of stickers',
    form_StickerFile_label: 'Upload your sticker design file',
    callToAction_GoBack_label: 'Back to map',
  },
}
const [t] = useDictionary(dictionary)

interface DialogCreateDesignProps {
  ref: HTMLButtonElement | ((el: HTMLButtonElement) => void)
}
export const DialogCreateDesign = (props: DialogCreateDesignProps) => {
  const mutationUploadFileToBundlr = createMutation(async () => {})
  const { form, data, setData } = createForm({
    onSubmit: (values) => {},
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
                {/* @ts-ignore */}
                <form use:form class="gap-6 flex flex-col">
                  <fieldset class="flex flex-col gap-3">
                    <div>
                      <div class="w-full flex flex-col-reverse relative min-h-[33dvh] rounded p-3 border-2 border-dashed border-metal-5">
                        <input
                          onChange={(e) => {
                            // local URI
                            //@ts-ignore
                            if (e.currentTarget.files[0] && e.currentTarget.files[0] !== null) {
                              //@ts-ignore
                              const src = URL.createObjectURL(e.currentTarget.files[0])
                              setData('design-file-uri', src)
                            }
                          }}
                          accept="image/*"
                          class="absolute z-10 opacity-0 inset-0 w-full h-full"
                          type="file"
                          name="design-file-src"
                        />

                        <label
                          class="text-xs font-bold mt-auto py-3 w-full text-center text-metal-11"
                          for="design-file-src"
                        >
                          {t.form_StickerFile_label()}
                          RiCommunicationEmojiStickerFill{' '}
                        </label>
                        <Show
                          fallback={<TbSticker class="text-metal-7 m-auto" size={96} />}
                          when={data()?.['design-file-uri']}
                        >
                          <img
                            src={data()?.['design-file-uri']}
                            class="w-full my-auto object-contain max-w-32 h-auto"
                          />
                        </Show>
                      </div>
                    </div>

                    <div class="flex flex-col">
                      <label class="text-sm text-metal-11" for="collection-name">
                        {t.form_StickerCollectionName_label()}
                      </label>
                      <FormInput class="w-full" type="text" name="collection-name" />
                    </div>

                    <div class="flex flex-col">
                      <label class="text-sm text-metal-11" for="amount">
                        {t.form_StickerCollectionAmount_label()}
                      </label>
                      <FormInput class="w-full" type="number" min={1} name="amount" />
                    </div>
                  </fieldset>
                  <Button class="w-full inline-flex justify-center items-center">{t.callToAction_label()}</Button>
                </form>
              </div>
            </DialogDrawerBody>
          </Portal>
        </>
      )}
    </Dialog>
  )
}

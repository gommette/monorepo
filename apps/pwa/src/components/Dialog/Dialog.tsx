import { DialogBackdrop, DialogContainer, DialogContent } from '@ark-ui/solid'
import { Show, type JSX } from 'solid-js'
import { cva, type VariantProps } from 'class-variance-authority'
import { Transition } from 'solid-transition-group'

export const dialogContent = cva('bg-neutral-2 shadow-lg relative', {
  variants: {
    intent: {
      'bottom-drawer': 'w-full md:max-w-lg lg:max-w-xl items-end rounded-b-none',
      alert: 'w-[90vw] max-w-xl items-center',
    },
    scale: {
      default: 'rounded-xl',
      fullscreen: '',
    },
  },
  defaultVariants: {
    intent: 'bottom-drawer',
    scale: 'default',
  },
})

export type SystemUiDialogProps = VariantProps<typeof dialogContent>
export interface DialogProps extends SystemUiDialogProps, JSX.BaseHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean
}

export const Dialog = (props: DialogProps) => {
  return (
    <>
      <Transition enterActiveClass="animate-backdropIn" exitActiveClass="animate-backdropOut">
        <Show when={props.isOpen}>
          <DialogBackdrop class="z-50 fixed inset-0 bg-neutral-12 bg-opacity-75" />
        </Show>
      </Transition>

      <DialogContainer class="z-50 flex items-end justify-center inset-0 fixed">
        <Transition enterActiveClass="animate-slideIn" exitActiveClass="animate-slideOut">
          <Show when={props.isOpen}>
            <DialogContent
              class={dialogContent({
                intent: props.intent ?? 'bottom-drawer',
                scale: props.scale ?? 'default',
                class: props.class ?? '',
              })}
            >
              {props.children}
            </DialogContent>
          </Show>
        </Transition>
      </DialogContainer>
    </>
  )
}

export default Dialog

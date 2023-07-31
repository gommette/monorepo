import { DialogBackdrop, DialogContainer, DialogContent } from '@ark-ui/solid'
import { type JSX } from 'solid-js'
import { cva, type VariantProps } from 'class-variance-authority'

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
export interface DialogProps extends SystemUiDialogProps, JSX.BaseHTMLAttributes<HTMLDialogElement> {}

export const Dialog = (props: DialogProps) => {
  return (
    <>
      <DialogBackdrop class="z-50 fixed inset-0 bg-neutral-12 bg-opacity-75" />
      <DialogContainer class="z-50 flex items-end justify-center inset-0 fixed">
        <DialogContent
          class={dialogContent({
            intent: props.intent ?? 'bottom-drawer',
            scale: props.scale ?? 'default',
            class: props.class ?? '',
          })}
        >
          {props.children}
        </DialogContent>
      </DialogContainer>
    </>
  )
}

export default Dialog

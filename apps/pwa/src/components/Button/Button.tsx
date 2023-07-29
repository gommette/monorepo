import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

// CTA looking element (like button and links)
export const callToAction = cva(
  'rounded-md font-bold px-[1.5em] transition-colors transition-500 disabled:!opacity-50 disabled:pointer-events-none',
  {
    variants: {
      intent: {
        primary: [
          'bg-primary-9 text-primary-1 hover:bg-primary-10 focus:bg-primary-11 hover:bg-opacity-90 hover:focus:bg-opacity-95',
          'border-transparent',
        ],
        'primary-outline': [
          'bg-transparent hover:bg-primary-9 focus:bg-primary-11 hover:focus:bg-opacity-95',
          'text-primary-12 focus:text-primary-3',
          'border-primary-9 focus:border-primary-11',
        ],
        'primary-ghost': [
          'border-transparent bg-primary-4 bg-opacity-0 text-primary-11 hover:bg-opacity-100 focus:border-transparent focus:bg-opacity-100 focus:text-primary-1',
        ],
        'primary-faint': [
          'border-transparent  bg-primary-4 bg-opacity-75 text-primary-11 hover:bg-opacity-50 focus:border-transparent focus:bg-opacity-100 focus:text-primary-11',
        ],
        negative: [
          'bg-negative-10 hover:bg-negative-9 focus:bg-negative-11 hover:focus:bg-opacity-95',
          'text-negative-3',
          'border-transparent',
        ],
        'negative-faint': [
          'border-transparent  bg-negative-4 bg-opacity-75 text-negative-11 hover:bg-opacity-50 focus:border-transparent focus:bg-opacity-100 focus:text-negative-11',
        ],
        'negative-outline': [
          'bg-transparent hover:bg-negative-9 hover:text-negative-1 focus:bg-negative-11 hover:focus:bg-opacity-95',
          'text-negative-12 focus:text-negative-3',
          'border-negative-9 focus:border-negative-11',
        ],
        'negative-ghost': [
          'border-transparent bg-negative-4 bg-opacity-0 text-negative-11 hover:bg-opacity-100 focus:border-transparent focus:bg-opacity-100 focus:text-negative-1',
        ],
      },
      scale: {
        default: ['py-[0.9em]'],
        lg: ['py-[0.85em]'],
        sm: ['py-[0.25em]'],
        xs: ['py-[0.25em]'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      scale: 'default',
    },
  },
)

export type SystemUiCTAProps = VariantProps<typeof callToAction>

import { splitProps, type JSX } from 'solid-js'

export interface ButtonProps extends SystemUiCTAProps, JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = (props: ButtonProps) => {
  const [local, buttonProps] = splitProps(props, ['children', 'isLoading', 'class', 'intent', 'scale'])
  return (
    <button
      class={callToAction({
        intent: local.intent ?? 'primary',
        scale: local.scale ?? 'default',
        class: local.class ?? '',
      })}
      aria-disabled={buttonProps.disabled || local.isLoading === true}
      {...buttonProps}
    >
      {local.isLoading && (
        <span
          classList={{
            'mie-1ex': local?.class?.includes('rounded-full'),
          }}
          class="animate-spin"
        />
      )}
      {local.children}
    </button>
  )
}

export default Button

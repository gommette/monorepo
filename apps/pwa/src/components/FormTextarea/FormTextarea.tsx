import { textField, type SystemUiTextFieldProps } from '../TextField'
import { splitProps, type JSX } from 'solid-js'

interface FormTextareaProps extends SystemUiTextFieldProps, JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const FormTextarea = (props: FormTextareaProps) => {
  const [local, inputProps] = splitProps(props, ['hasError', 'appearance', 'class', 'intent', 'scale'])

  //@ts-ignore
  return (
    <textarea
      class={textField({
        appearance: local?.appearance ?? 'square',
        scale: local?.scale ?? 'default',
        //@ts-ignore
        variant: local?.hasError === true ? 'error' : 'default',
        //@ts-ignore
        class: local.class ?? '',
      })}
      {...inputProps}
    />
  )
}

export default FormTextarea

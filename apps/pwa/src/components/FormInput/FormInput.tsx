import { textField, type SystemUiTextFieldProps } from '../TextField'
import { splitProps, type JSX } from 'solid-js'

interface FormInputProps extends SystemUiTextFieldProps, JSX.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const FormInput = (props: FormInputProps) => {
  const [local, inputProps] = splitProps(props, ['hasError', 'appearance', 'class', 'intent', 'scale'])

  //@ts-ignore
  return (
    <input
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

export default FormInput

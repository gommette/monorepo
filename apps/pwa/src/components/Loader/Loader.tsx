import { Show } from 'solid-js'
import { CgSpinner } from 'solid-icons/cg'
import { Transition } from 'solid-transition-group'

interface LoaderProps {
  isVisible: boolean
}
export const Loader = (props: LoaderProps) => {
  return (
    <div class="rotate-180 flex justify-center">
      <Transition enterActiveClass="animate-slideIn" exitActiveClass="animate-fadeOut">
        <Show when={props.isVisible}>
          <span class="bg-neutral-1 rotate-180 flex items-center justify-center h-8 w-8 rounded-full shadow">
            <CgSpinner class="animate-spin text-primary-9" />
          </span>
        </Show>
      </Transition>
    </div>
  )
}

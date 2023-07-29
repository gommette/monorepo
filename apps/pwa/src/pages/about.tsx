import { Component, createEffect, Suspense } from 'solid-js'
import { useRouteData } from '@solidjs/router'
import type { AboutDataType } from './about.data'
import { useAuthentication } from '../features'

export default function About() {
  const { mutationSignOut } = useAuthentication()
  const name = useRouteData<AboutDataType>()

  createEffect(() => {
    console.log(name())
  })

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <button onClick={() => mutationSignOut.mutate()}>sign out</button>
      <h1 class="text-2xl font-bold">About</h1>

      <p class="mt-4">A page all about this website.</p>

      <p>
        <span>We love</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp;{name()}</span>
        </Suspense>
      </p>
    </section>
  )
}

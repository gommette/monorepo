import { onMount, type Component } from 'solid-js'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { useRoutes } from '@solidjs/router'
import { routes } from './routes'
import { AuthenticationProvider } from './features'

export const queryClient = new QueryClient()
const App: Component = () => {
  const Route = useRoutes(routes)

  onMount(() => {})
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <Route />
      </AuthenticationProvider>
    </QueryClientProvider>
  )
}

export default App

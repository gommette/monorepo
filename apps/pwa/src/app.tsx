import { onMount, type Component } from 'solid-js'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Link, useRoutes, useLocation } from '@solidjs/router'
import { routes } from './routes'
import { AuthenticationProvider } from './features'
import Landing from './screens/Landing'

export const queryClient = new QueryClient()
const App: Component = () => {
  const location = useLocation()
  const Route = useRoutes(routes)

  onMount(() => {})
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <Landing />
        {/* <Route /> */}
      </AuthenticationProvider>
    </QueryClientProvider>
  )
}

export default App

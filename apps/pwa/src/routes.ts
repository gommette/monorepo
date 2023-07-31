import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'
import Landing from './pages/landing'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/app',
    component: lazy(() => import('./pages/app')),
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
]

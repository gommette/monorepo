import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'
import Landing from './pages/landing'
import AboutData from './pages/about.data'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
    data: AboutData,
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
]

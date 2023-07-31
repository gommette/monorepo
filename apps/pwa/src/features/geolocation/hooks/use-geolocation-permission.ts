import { createPermission } from '@solid-primitives/permission'
import { createMutation, type CreateMutationResult } from '@tanstack/solid-query'
import { type Accessor } from 'solid-js'

export function useGeolocationPermission(): {
  mutationGrantGeolocationPermission: CreateMutationResult<void, unknown, void, unknown>
  stateGeolocationPermission: Accessor<PermissionState | 'unknown'>
} {
  const stateGeolocationPermission = createPermission('geolocation')
  const mutationGrantGeolocationPermission = createMutation({
    mutationFn: async () => {
      return navigator.geolocation.getCurrentPosition(() => true)
    },
  })

  return {
    mutationGrantGeolocationPermission,
    stateGeolocationPermission,
  }
}

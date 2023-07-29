import { createContext, useContext, onMount, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { createMutation, type CreateMutationResult } from '@tanstack/solid-query'
import { Othent } from 'arweavekit/auth'
import type { UserDetailsReturnProps } from 'arweavekit/dist/types/auth'
import { useLocation, useNavigate } from '@solidjs/router'

interface Authentication {
  /** Wheter the wallet is connected */
  connected: boolean
  /** wallet address associated with a user's email account */
  walletAddress: string
  /** */
  provider: typeof Othent
  profile:
    | {
        firstName: string
        nickname: string
        fullname: string
        picture: string
        locale: string
        email: string
        emailVerificationStatus: string
      }
    | undefined
}

/**
 * SolidJS context for managing on-chain authentication/online identity state and operations
 */
const AuthenticationContext = createContext<{
  /** SolidJS store that contains data related to the on-chain authentication/online identity state and operations */
  storeAuthentication: Authentication

  /** Sign the current user in */
  mutationSignIn: CreateMutationResult<UserDetailsReturnProps, unknown, void, unknown>

  /** Mutate current user info */
  mutationCurrentUser: CreateMutationResult<UserDetailsReturnProps, unknown, void, unknown>

  /** Sign the current user out */
  mutationSignOut: CreateMutationResult<unknown, unknown, void, unknown>
}>()

/**
 * On-chain identity store default state
 */
const DEFAULT_STATE: Authentication = {
  provider: Othent,
  connected: false,
  walletAddress: undefined,
  profile: undefined,
}

export const OTHENT_PARAMETERS = {
  apiId: import.meta.env.VITE_OTHENT_APP_ID,
}

export function AuthenticationProvider(props) {
  const [storeAuthentication, setStoreAuthentication] = createStore(DEFAULT_STATE)

  const location = useLocation()
  const navigate = useNavigate()

  // Refresh session on mount
  onMount(async () => {
    await mutationCurrentUser.mutateAsync()
  })

  const mutationCurrentUser = createMutation({
    mutationFn: async (): Promise<UserDetailsReturnProps> => {
      return await Othent.userDetails(OTHENT_PARAMETERS)
    },
    onSuccess(data) {
      if (data) {
        setStoreAuthentication({
          connected: true,
          walletAddress: data?.contract_id,
          profile: {
            firstName: data?.given_name,
            nickname: data?.nickname,
            fullname: data?.name,
            picture: data?.picture,
            locale: data?.locale,
            email: data?.email,
            emailVerificationStatus: data?.email_verified,
          },
        })
      }
    },
  })

  const mutationSignIn = createMutation({
    mutationFn: async () => {
      return await Othent.logIn(OTHENT_PARAMETERS)
    },
    onSuccess(data) {
      if (data) {
        setStoreAuthentication({
          connected: true,
          walletAddress: data?.contract_id,
          profile: {
            firstName: data?.given_name,
            nickname: data?.nickname,
            fullname: data?.name,
            picture: data?.picture,
            locale: data?.locale,
            email: data?.email,
            emailVerificationStatus: data?.email_verified,
          },
        })
      }
    },
  })

  const mutationSignOut = createMutation({
    mutationFn: async (): Promise<void> => {
      return await Othent.logOut(OTHENT_PARAMETERS)
    },
    onMutate() {
      setStoreAuthentication(DEFAULT_STATE)
      navigate('/')
    },
  })

  createEffect(() => {
    // Redirect the user to overworld map view when connected
    if (location.pathname === '/' && storeAuthentication.connected) navigate('/about')
  })
  return (
    <AuthenticationContext.Provider
      value={{
        storeAuthentication,
        mutationSignIn,
        mutationCurrentUser,
        mutationSignOut,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  )
}

/**
 * Hook for accessing the auth context (current user, chain provider, mutations...)
 *
 * @returns {AuthenticationContextValue} Authentication context value.
 */
export function useAuthentication() {
  return useContext(AuthenticationContext)
}

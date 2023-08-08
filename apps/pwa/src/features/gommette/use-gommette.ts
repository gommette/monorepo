import {
  type CreateQueryResult,
  createQuery,
  type CreateMutationResult,
  createMutation,
  useQueryClient,
} from '@tanstack/solid-query'
import type {
  AppState,
  Coordinates,
  MappingCoordinatesSticker,
  MappingIdStickerBoard,
  Player,
  StickerPickUpConditions,
} from '@gommette/types'
import { readContractState } from 'arweavekit/contract'
import type { ReadContractWOthentProps } from 'arweavekit/dist/types/contract'
import { useAuthentication } from '../authentication'

interface PlayerWithOrderedInventory extends Player {
  inventoryWithAmount: {
    [key: string]: number
  }
}

export const smartcontractConfigOthent: ReadContractWOthentProps = {
  apiId: import.meta.env.VITE_OTHENT_APP_ID,
  contractTxId: import.meta.env.VITE_GOMMETTE_CONTRACT_ID,
}

const WARP_ENV = import.meta.env.GOMMETTE_WARP_ENV || 'testnet'
const CONTRACT_TX_ID = import.meta.env.VITE_GOMMETTE_CONTRACT_ID

/**
 * Get smart contract state via Arweavekit + Othent
 */
async function getContractState() {
  const response = await fetch('http://localhost:8080/api/state')
  const result = await response.json()
  return result
  /*
  return await readContractWOthent({
    ...smartcontractConfigOthent,
  })
  */
}

export function useGommette(): {
  queryCurrentOverworld: CreateQueryResult<
    {
      overworldMap: MappingCoordinatesSticker
    },
    unknown
  >

  queryPlayer: CreateQueryResult<
    {
      player: PlayerWithOrderedInventory
    },
    unknown
  >

  queryStickerBoards: CreateQueryResult<
    {
      stickerBoards: MappingIdStickerBoard
    },
    unknown
  >
  mutationClaimDailyDrop: CreateMutationResult<any, unknown, void, unknown>
  mutationUpdatePlayerGeolocation: CreateMutationResult<
    any,
    unknown,
    {
      coordinates: Coordinates
    },
    unknown
  >

  mutationPinSticker: CreateMutationResult<
    any,
    unknown,
    {
      idSticker: string
      messageText: string
      coordinates: Coordinates
      pickupConditions: StickerPickUpConditions
    },
    unknown
  >

  mutationPickSticker: CreateMutationResult<
    any,
    unknown,
    {
      idSticker: string
      messageText: string
      coordinates: Coordinates
    },
    unknown
  >
} {
  const client = useQueryClient()
  const { storeAuthentication } = useAuthentication()
  const queryCurrentOverworld = createQuery(() => ['current-map'], getContractState, {
    select(data): {
      overworldMap: MappingCoordinatesSticker
    } {
      const state = data?.result?.state as AppState
      return {
        overworldMap: state?.overworldMap?.current,
      }
    },
  })

  const queryStickerBoards = createQuery(() => ['sticker-boards'], getContractState, {
    select(data): {
      stickerBoards: MappingIdStickerBoard
    } {
      const state = data?.result?.state as AppState
      return {
        stickerBoards: { ...state?.stickerBoards },
      }
    },
  })

  const queryPlayer = createQuery(() => ['player', storeAuthentication?.walletAddress], getContractState, {
    select(data): {
      player: PlayerWithOrderedInventory
    } {
      const state = data?.result?.state as AppState
      const player = {
        id: storeAuthentication?.walletAddress, // user arweave address
        inventory: [],
        history: [],
        creations: [],
      }

      let inventoryWithAmount = {}
      state?.players?.[storeAuthentication?.walletAddress].inventory.map((sticker) => {
        let amount = inventoryWithAmount?.[sticker.idStickerBoard]?.amount ?? 0
        inventoryWithAmount[sticker.idStickerBoard] = amount + 1
      })

      return {
        player: {
          ...player,
          ...state?.players?.[storeAuthentication?.walletAddress],
          inventoryWithAmount,
        },
      }
    },
    get enabled() {
      return storeAuthentication.walletAddress ? true : false
    },
  })

  /**
   * Update the player current geolocation ;
   * automatically called when the user connects, before they pin and before they pick a sticker
   */
  const mutationUpdatePlayerGeolocation = createMutation(async (args: { coordinates: Coordinates }) => {
    const response = await fetch('http://localhost:8080/api/player/geolocation', {
      method: 'PUT',
      body: JSON.stringify({
        idPlayer: storeAuthentication.walletAddress,
        coordinates: args.coordinates,
      }),
    })
    const result = await response.json()
    return result
  })

  /**
   * Drop 3 random stickers in the user's inventory
   */
  const mutationClaimDailyDrop = createMutation(
    async () => {
      const response = await fetch('http://localhost:8080/api/player/inventory/claim-daily-drop', {
        method: 'POST',
        body: JSON.stringify({
          idPlayer: storeAuthentication.walletAddress,
        }),
      })
      const result = await response.json()
      return result
    },
    {
      onSuccess(data, variables, context) {
        client.invalidateQueries(['player', storeAuthentication?.walletAddress])
      },
    },
  )

  /**
   * Pin a sticker to the overworld map
   */
  const mutationPinSticker = createMutation(
    async (args: {
      idSticker: string
      messageText: string
      coordinates: Coordinates
      pickupConditions: StickerPickUpConditions
    }) => {
      const response = await fetch('http://localhost:8080/api/overworld/pin-sticker', {
        method: 'PUT',
        body: JSON.stringify({
          idPlayer: storeAuthentication.walletAddress,
          ...args,
        }),
      })

      const result = await response.json()
      return result
    },
  )

  /**
   * Pick a sticker from the overworld map
   */
  const mutationPickSticker = createMutation(
    async (args: { idSticker: string; messageText: string; coordinates: Coordinates }) => {
      const response = await fetch('http://localhost:8080/api/overworld/pick-sticker', {
        method: 'PUT',
        body: JSON.stringify({
          idPlayer: storeAuthentication.walletAddress,
          ...args,
        }),
      })

      const result = await response.json()
      return result
    },
  )

  return {
    mutationUpdatePlayerGeolocation,
    mutationClaimDailyDrop,
    mutationPinSticker,
    mutationPickSticker,
    queryPlayer,
    queryStickerBoards,
    queryCurrentOverworld,
  }
}

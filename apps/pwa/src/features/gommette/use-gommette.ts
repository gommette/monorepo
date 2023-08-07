import { type CreateQueryResult, createQuery, type CreateMutationResult, createMutation } from '@tanstack/solid-query'
import type { AppState, Coordinates, MappingCoordinatesSticker, MappingIdStickerBoard, Player } from '@gommette/types'
import { readContractWOthent, writeContractWOthent } from 'arweavekit/contract'
import type { ReadContractWOthentProps, WriteContractWOthentReturnProps } from 'arweavekit/dist/types/contract'
import { useAuthentication } from '../authentication'

export const smartcontractConfigOthent: ReadContractWOthentProps = {
  apiId: import.meta.env.VITE_OTHENT_APP_ID,
  contractTxId: import.meta.env.VITE_GOMMETTE_CONTRACT_ID,
}

async function getContractState() {
  return await readContractWOthent({
    ...smartcontractConfigOthent,
  })
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
      player: Player
    },
    unknown
  >

  queryStickerBoards: CreateQueryResult<
    {
      stickerBoards: MappingIdStickerBoard
    },
    unknown
  >

  mutationPlayerGeolocation: CreateMutationResult<
    WriteContractWOthentReturnProps,
    unknown,
    {
      coordinates: Coordinates
    },
    unknown
  >
} {
  const { storeAuthentication } = useAuthentication()
  const queryCurrentOverworld = createQuery(() => ['current-map'], getContractState, {
    select(data): {
      overworldMap: MappingCoordinatesSticker
    } {
      const state = data?.state as AppState
      return {
        overworldMap: state?.overworldMap?.current,
      }
    },
  })

  const queryStickerBoards = createQuery(() => ['sticker-boards'], getContractState, {
    select(data): {
      stickerBoards: MappingIdStickerBoard
    } {
      const state = data?.state as AppState
      console.log('data', data)
      return {
        stickerBoards: { ...state?.stickerBoards },
      }
    },
  })

  const queryPlayer = createQuery(() => ['player', storeAuthentication?.walletAddress], getContractState, {
    select(data): {
      player: Player
    } {
      const state = data?.state as AppState
      const player = {
        id: storeAuthentication?.walletAddress, // user arweave address
        inventory: [],
        history: [],
        creations: [],
      }
      return {
        player: {
          ...player,
          ...state?.players?.[storeAuthentication?.walletAddress],
        },
      }
    },
    get enabled() {
      return storeAuthentication.walletAddress ? true : false
    },
  })

  const mutationPlayerGeolocation = createMutation(async (args: { coordinates: Coordinates }) => {
    const result = await writeContractWOthent({
      apiId: smartcontractConfigOthent.apiId,
      othentFunction: 'sendTransaction',
      data: {
        toContractId: smartcontractConfigOthent.contractTxId,
        toContractFunction: 'updateCurrentGeolocation',
        txnData: {
          coordinates: args.coordinates,
        },
      },
    })

    return result
  })
  return {
    mutationPlayerGeolocation,
    queryPlayer,
    queryStickerBoards,
    queryCurrentOverworld,
  }
}

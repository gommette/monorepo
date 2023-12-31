import { getUnixTime } from 'date-fns'
import type { ContractResult, Coordinates, GommetteState, Player, Sticker } from '../../types'
declare const ContractError

export type PickStickerFunction = 'pickSticker'

export interface PickStickerdInput {
  function: PickStickerFunction
  idSticker: string
  coordinates: Coordinates
  messageText: string
  idPlayer: string
}

export interface PickStickerAction {
  input: PickStickerdInput
  caller: string
}

/**
 * Pick sticker from the map
 */
export async function pickSticker(
  state: GommetteState,
  { input: { idSticker, coordinates, messageText, idPlayer }, caller }: PickStickerAction,
): Promise<ContractResult> {
  /**
   * Temporary implementation as we are having issue with arweavekit/othent calling write function ;
   * this implementation would allow us to demonstrate state write on behalf of the user
   */

  if (caller !== state.setter) {
    throw new ContractError('Only players can pick stickers from the map !')
  }

  // Verify there's a sticker pinned at this location
  if (!state.overworldMap.current[coordinates.join(',')]) {
    throw new ContractError('No sticker pinned at this location')
  }

  const pinnedSticker: Sticker = state.overworldMap.current[coordinates.join(',')]

  // Verify the sticker pinned and the requested sticker are the same
  if (pinnedSticker.id !== idSticker) {
    throw new ContractError('A different sticker is pinned at this location')
  }

  // Verify the pinner isn't the player
  if (pinnedSticker.message.author === idPlayer) {
    throw new ContractError("You can't pick stickers you pinned !")
  }

  let player: Player = { ...state.players[idPlayer] }
  player.coordinates = coordinates
  const playerInventory = player?.inventory ?? []
  const collectedSticker: Sticker = {
    id: pinnedSticker.id,
    idStickerBoard: pinnedSticker.idStickerBoard,
    pickupConditions: {
      conditionType: 'FREE',
    },
  }
  const requiredStickersIdBoards = Object.keys(pinnedSticker.pickupConditions?.stickers) ?? []
  if (pinnedSticker.pickupConditions.conditionType !== 'FREE') {
    requiredStickersIdBoards?.map((idBoard) => {
      const requiredAmount = pinnedSticker.pickupConditions.stickers[idBoard]
      const inInventory = playerInventory.filter((sticker: Sticker) => sticker.idStickerBoard === idBoard)?.length ?? 0
      if (inInventory < requiredAmount) {
        throw new ContractError("You don't meet the expected requirements to pick up this sticker.")
      }
    })
  }

  requiredStickersIdBoards?.map((idBoard) => {
    const requiredAmount = pinnedSticker.pickupConditions.stickers[idBoard]
    let pinned = 0
    while (pinned < requiredAmount) {
      const currentTimestamp = getUnixTime(new Date())
      let stickerToPinIndex = state.players?.[idPlayer]?.inventory?.findIndex(
        (sticker: Sticker) => sticker.idStickerBoard === idBoard,
      )
      let stickerToPin: Sticker = player.inventory[stickerToPinIndex]
      stickerToPin.message = {
        author: idPlayer,
        text: messageText,
        coordinates: coordinates,
        createdAt: currentTimestamp,
      }
      stickerToPin.pickupConditions = {
        conditionType: 'FREE',
      }

      if (pinnedSticker.pickupConditions.conditionType === 'EXCHANGE') {
        // pin sticker on the map
        state.overworldMap.current[coordinates.join()] = stickerToPin

        // add sticker to the map history
        state.overworldMap.history.time[currentTimestamp][coordinates.join()] = stickerToPin
        state.overworldMap.history.location[coordinates.join()]?.push(stickerToPin)
      }

      // Remove it from the player's inventory
      state.players[idPlayer].inventory.splice(stickerToPinIndex, 1)

      pinned++
    }
  })
  // Add sticker to player's inventory
  ;(state.players[idPlayer] as Player).inventory = [...(state.players[idPlayer]?.inventory ?? []), collectedSticker]

  return {
    state,
  }
  /*


  if (!caller) {
    throw new ContractError('Only players can pick stickers from the map !')
  }

  // Verify there's a sticker pinned at this location
  if (!state.overworldMap.current[coordinates.join(',')]) {
    throw new ContractError('No sticker pinned at this location')
  }

  const pinnedSticker: Sticker = state.overworldMap.current[coordinates.join(',')]

  // Verify the sticker pinned and the requested sticker are the same
  if (pinnedSticker.id !== idSticker) {
    throw new ContractError('A different sticker is pinned at this location')
  }

  // Verify the pinner isn't the player
  if (pinnedSticker.message.author === caller) {
    throw new ContractError("You can't pick stickers you pinned !")
  }

  const player: Player = state.players[caller]

  // verify if the user is pinning the sticker at their geolocation
  if (coordinates.join() !== player.coordinates.join()) {
    throw new ContractError('You can only pick a sticker at your current geolocation !')
  }

  const playerInventory = player?.inventory ?? []
  const collectedSticker: Sticker = {
    id: pinnedSticker.id,
    idStickerBoard: pinnedSticker.idStickerBoard,
    pickupConditions: {
      conditionType: 'FREE',
    },
  }
  const requiredStickersIdBoards = Object.keys(pinnedSticker.pickupConditions.stickers)
  if (pinnedSticker.pickupConditions.conditionType !== 'FREE') {
    requiredStickersIdBoards.map((idBoard) => {
      const requiredAmount = pinnedSticker.pickupConditions.stickers[idBoard]
      const inInventory = playerInventory.filter((sticker: Sticker) => sticker.idStickerBoard === idBoard)?.length ?? 0
      if (inInventory < requiredAmount) {
        throw new ContractError("You don't meet the expected requirements to pick up this sticker.")
      }
    })
  }

  requiredStickersIdBoards.map((idBoard) => {
    const requiredAmount = pinnedSticker.pickupConditions.stickers[idBoard]
    let pinned = 0
    while (pinned < requiredAmount) {
      const currentTimestamp = getUnixTime(new Date())
      let stickerToPinIndex = state.players[caller].inventory.findIndex(
        (sticker: Sticker) => sticker.idStickerBoard === idBoard,
      )
      let stickerToPin: Sticker = player.inventory[stickerToPinIndex]
      stickerToPin.message = {
        author: caller,
        text: messageText,
        coordinates: coordinates,
        createdAt: currentTimestamp,
      }
      stickerToPin.pickupConditions = {
        conditionType: 'FREE',
      }

      if (pinnedSticker.pickupConditions.conditionType === 'EXCHANGE') {
        // pin sticker on the map
        state.overworldMap.current[coordinates.join()] = stickerToPin

        // add sticker to the map history
        state.overworldMap.history.time[currentTimestamp][coordinates.join()] = stickerToPin
        state.overworldMap.history.location[coordinates.join()].push(stickerToPin)
      }

      // Remove it from the player's inventory
      state.players[caller].inventory.splice(stickerToPinIndex, 1)

      pinned++
    }
  })
  // Add sticker to player's inventory
  ;(state.players[caller] as Player).inventory.push(collectedSticker)

  return {
    state,
  }
*/
}

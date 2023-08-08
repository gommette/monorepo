import { getUnixTime } from 'date-fns'
import type { ContractResult, Coordinates, GommetteState, Player, Sticker, StickerPickUpConditions } from '../../types'
declare const ContractError

export type PinStickerFunction = 'pinSticker'

export interface PinStickerdInput {
  function: PinStickerFunction
  idSticker: string
  messageText: string
  coordinates: Coordinates
  pickupConditions: StickerPickUpConditions
  idPlayer: string
}

export interface PinStickerAction {
  input: PinStickerdInput
  caller: string
}

/**
 * Pin sticker to the map
 */
export async function pinSticker(
  state: GommetteState,
  { input: { idSticker, messageText, coordinates, pickupConditions, idPlayer }, caller }: PinStickerAction,
): Promise<ContractResult> {
  /**
   * Temporary implementation as we are having issue with arweavekit/othent calling write function ;
   * this implementation would allow us to demonstrate state write on behalf of the user
   */

  // verify that there's a player
  if (caller !== state.setter) {
    throw new ContractError('Only players can pin stickers on the map !')
  }

  const player: Player = state.players[idPlayer]
  const stickerToPinIndex = player.inventory.findIndex((sticker) => sticker.id === idSticker)

  // verify if the sticker is in the user's inventory
  if (stickerToPinIndex < 0) {
    throw new ContractError('You can only pin stickers from your inventory!')
  }

  // verify if the user is pinning the sticker at their geolocation
  if (coordinates.join() !== player.coordinates.join()) {
    throw new ContractError('You can only pin a sticker at your current geolocation !')
  }

  const currentTimestamp = getUnixTime(new Date())
  let stickerToPin: Sticker = player.inventory[stickerToPinIndex]
  stickerToPin.message = {
    author: idPlayer,
    text: messageText,
    coordinates: coordinates,
    createdAt: currentTimestamp,
  }
  stickerToPin.pickupConditions = pickupConditions

  // pin sticker on the map
  state.overworldMap.current[coordinates.join()] = stickerToPin

  // add sticker to the map history
  state.overworldMap.history.time[currentTimestamp][coordinates.join()] = stickerToPin
  state.overworldMap.history.location[coordinates.join()]?.push(stickerToPin)

  // remove sticker from the player's inventory
  state.players[idPlayer].inventory.splice(stickerToPinIndex, 1)

  return {
    state,
  }
  /*

        // verify that there's a player
  if (!caller) {
    throw new ContractError('Only players can pin stickers on the map !')
  }
  const player: Player = state.players[caller]
  const stickerToPinIndex = player.inventory.findIndex((sticker) => sticker.id === idSticker)

  // verify if the sticker is in the user's inventory
  if (stickerToPinIndex < 0) {
    throw new ContractError('You can only pin stickers from your inventory!')
  }

  // verify if the user is pinning the sticker at their geolocation
  if (coordinates.join() !== player.coordinates.join()) {
    throw new ContractError('You can only pin a sticker at your current geolocation !')
  }

  const currentTimestamp = getUnixTime(new Date())
  let stickerToPin: Sticker = player.inventory[stickerToPinIndex]
  stickerToPin.message = {
    author: caller,
    text: messageText,
    coordinates: coordinates,
    createdAt: currentTimestamp,
  }
  stickerToPin.pickupConditions = pickupConditions

  // pin sticker on the map
  state.overworldMap.current[coordinates.join()] = stickerToPin

  // add sticker to the map history
  state.overworldMap.history.time[currentTimestamp][coordinates.join()] = stickerToPin
  state.overworldMap.history.location[coordinates.join()]?.push(stickerToPin)

  // remove sticker from the player's inventory
  state.players[caller].inventory.splice(stickerToPinIndex, 1)

  return {
    state,
  }
  */
}

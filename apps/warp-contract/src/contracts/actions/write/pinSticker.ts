import { getUnixTime } from 'date-fns'
import type { ContractResult, Coordinates, GommetteState, Player, Sticker, StickerPickUpConditions } from '../../types'
import { ContractError } from 'warp-contracts'

export type PinStickerFunction = 'pinSticker'

export interface PinStickerdInput {
  function: PinStickerFunction
  idSticker: string
  messageText: string
  coordinates: Coordinates
  pickupConditions: StickerPickUpConditions
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
  { input: { idSticker, messageText, coordinates, pickupConditions }, caller }: PinStickerAction,
): Promise<ContractResult> {
  if (!caller) {
    throw new ContractError('Only players can pin stickers on the map !')
  }

  const player: Player = state.players[caller]
  const stickerToPinIndex = player.inventory.findIndex((sticker) => sticker.id === idSticker)
  if (stickerToPinIndex < 0) {
    throw new ContractError('You can only pin stickers from your inventory!')
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
  state.overworldMap.history.location[coordinates.join()].push(stickerToPin)

  // remove sticker from the player's inventory
  state.players[caller].inventory.splice(stickerToPinIndex, 1)

  return {
    state,
  }
}

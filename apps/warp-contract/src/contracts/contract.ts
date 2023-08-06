import type {
  CreateBoardAction,
  GetOverworldMapAction,
  LoadGameAction,
  GetStickerBoardsAction,
  GetStickerBoardByIdAction,
  GetPlayerInventoryAction,
  ClaimDailyDropAction,
  PinStickerAction,
  PickStickerAction,
  GetOverworldMapAtTimestampAction,
  GetOverworldMapHistoryForLocationAction,
  UpdateCurrentGeolocationAction,
} from './actions'
import {
  createStickerBoard,
  getStickerBoardById,
  getOverworldMap,
  loadGame,
  getStickerBoards,
  getPlayerInventory,
  claimDailyDrop,
  pinSticker,
  pickSticker,
  getOverworldMapAtTimestamp,
  getOverworldMapHistoryForLocation,
  updateCurrentGeolocation,
} from './actions'
import type { ContractResult, GommetteState, GommetteAction } from './types/types'

declare const ContractError

export async function handle(state: GommetteState, action: GommetteAction): Promise<ContractResult> {
  const input = action.input

  switch (input.function) {
    case 'loadGame':
      return await loadGame(state, action as LoadGameAction)
      break
    case 'getStickerBoards':
      return await getStickerBoards(state, action as GetStickerBoardsAction)
      break
    case 'getStickerBoardById':
      return await getStickerBoardById(state, action as GetStickerBoardByIdAction)

      break

    case 'createStickerBoard':
      return await createStickerBoard(state, action as CreateBoardAction)
      break

    case 'getOverworldMap':
      return await getOverworldMap(state, action as GetOverworldMapAction)
      break

    case 'getOverworldMapAtTimestamp':
      return await getOverworldMapAtTimestamp(state, action as GetOverworldMapAtTimestampAction)
      break

    case 'getOverworldMapHistoryForLocation':
      return await getOverworldMapHistoryForLocation(state, action as GetOverworldMapHistoryForLocationAction)
      break

    case 'getPlayerInventory':
      return await getPlayerInventory(state, action as GetPlayerInventoryAction)
      break

    case 'claimDailyDrop':
      return await claimDailyDrop(state, action as ClaimDailyDropAction)
      break

    case 'pinSticker':
      return await pinSticker(state, action as PinStickerAction)
      break

    case 'pickSticker':
      return await pickSticker(state, action as PickStickerAction)
      break

    case 'updateCurrentGeolocation':
      return await updateCurrentGeolocation(state, action as UpdateCurrentGeolocationAction)
      break

    default:
      throw new ContractError('No function supplied or function not recognised: ', action.input.function)
  }
}

import { getUnixTime } from 'date-fns'
import type { StickerBoard, ContractResult, GommetteState } from '../../types'

export type CreateBoardFunction = 'createStickerBoard'
export interface CreateBoardInput {
  function: CreateBoardFunction
  id: string
  name: string
  uri: string
  quantity: number
  idPlayer: string
}

export interface CreateBoardAction {
  input: CreateBoardInput
  caller: string
}

declare const ContractError

/**
 * Create a new sticker board
 */
export async function createStickerBoard(
  state: GommetteState,
  { input: { id, name, uri, quantity, idPlayer }, caller }: CreateBoardAction,
): Promise<ContractResult> {
  /**
   * Temporary implementation as we are having issue with arweavekit/othent calling write function ;
   * this implementation would allow us to demonstrate state write on behalf of the user
   */
  const newStickerBoard: StickerBoard = {
    id,
    name,
    uri,
    totalQuantity: quantity,
    availableQuantity: quantity,
    createdAt: getUnixTime(new Date()),
  }

  if (caller !== state.setter) {
    throw new ContractError('Only players can create custom designs !')
  }

  newStickerBoard.creator = idPlayer
  state.players[idPlayer].creations
  // add newly created sticker to the player's creations
  state.players[idPlayer].creations?.push(newStickerBoard)

  // add the newly created board to the sticker boards list
  state.stickerBoards[newStickerBoard.id] = newStickerBoard
  return {
    state,
  }

  /*
  const newStickerBoard: StickerBoard = {
    id,
    name,
    uri,
    totalQuantity: quantity,
    availableQuantity: quantity,
    createdAt: getUnixTime(new Date()),
  }

  if (caller) {
    newStickerBoard.creator = caller
    // add newly created sticker to the player's creations
    state.players[caller].creations?.push(newStickerBoard)
  }

  // add the newly created board to the sticker boards list
  state.stickerBoards[newStickerBoard.id] = newStickerBoard
  return {
    state,
  }
  */
}

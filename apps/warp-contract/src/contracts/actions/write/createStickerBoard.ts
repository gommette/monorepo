import { getUnixTime } from 'date-fns'
import type { StickerBoard, ContractResult, GommetteState } from '../../types'

export type CreateBoardFunction = 'createStickerBoard'
export interface CreateBoardInput {
  function: CreateBoardFunction
  id: string
  name: string
  uri: string
  quantity: number
}

export interface CreateBoardAction {
  input: CreateBoardInput
  caller: string
}
/**
 * Create a new sticker board
 */
export async function createStickerBoard(
  state: GommetteState,
  { input: { id, name, uri, quantity }, caller }: CreateBoardAction,
): Promise<ContractResult> {
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
    state.players[caller].creations.push(newStickerBoard)
  }

  // add the newly created board to the sticker boards list
  state.stickerBoards[newStickerBoard.id] = newStickerBoard
  return {
    state,
  }
}

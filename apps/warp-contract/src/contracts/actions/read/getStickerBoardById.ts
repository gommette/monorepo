import type { ContractResult, GommetteState, StickerBoard } from '../../types'
import { ContractError } from 'warp-contracts'

export type GetStickerBoardByIdFunction = 'getStickerBoardById'
export interface GetStickerBoardByIdInput {
  function: GetStickerBoardByIdFunction
  idBoard: string
}
export interface GetStickerBoardByIdAction {
  input: GetStickerBoardByIdInput
}
export type GetStickerBoardByIdResult = {
  stickerBoard: StickerBoard
}

/**
 * Get a given sticker board with id <idBoard> if it exists
 */
export async function getStickerBoardById(
  state: GommetteState,
  { input: { idBoard } }: GetStickerBoardByIdAction,
): Promise<ContractResult> {
  const stickerBoard = state.stickerBoards[idBoard]
  if (!stickerBoard) {
    throw new ContractError(`Sticker board with id: ${idBoard} does not exist`)
  }
  return {
    result: {
      stickerBoard: stickerBoard,
    },
  }
}

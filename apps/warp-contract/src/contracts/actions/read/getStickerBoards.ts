import type { ContractResult, GommetteState, MappingIdStickerBoard } from '../../types'

export type GetStickerBoardsFunction = 'getStickerBoards'
export interface GetStickerBoardsInput {
  function: GetStickerBoardsFunction
}
export interface GetStickerBoardsAction {
  input: GetStickerBoardsInput
}
export type GetStickerBoardsResult = {
  stickerBoards: MappingIdStickerBoard
}

/**
 * Get all existing sticker boards
 */
export async function getStickerBoards(
  state: GommetteState,
  { input }: GetStickerBoardsAction,
): Promise<ContractResult> {
  const stickerBoards = state.stickerBoards

  return {
    result: {
      stickerBoards,
    },
  }
}

import type {
  ContractResult,
  GommetteState,
  Player,
  MappingCoordinatesSticker,
  MappingIdStickerBoard,
  Coordinates,
} from '../../types'

export type LoadGameFunction = 'loadGame'
export interface LoadGameInput {
  function: 'loadGame'
  coordinates: Coordinates
}
export interface LoadGameAction {
  input: LoadGameInput
  caller: string
}
export interface LoadGameResult {
  player: Player
  overworldMap: MappingCoordinatesSticker
  stickerBoards: MappingIdStickerBoard
}

/**
 * Get current player (caller)'s inventory, along with the current map and the sticker boards
 */
export async function loadGame(
  state: GommetteState,
  { input: { coordinates }, caller }: LoadGameAction,
): Promise<ContractResult> {
  const player: Player = state.players[caller]
    ? state.players[caller]
    : {
        id: caller,
        coordinates,
        inventory: [],
        creations: [],
        history: [],
      }
  const map = state.overworldMap.current
  const stickerBoards = state.stickerBoards
  return {
    result: {
      player,
      overworldMap: map,
      stickerBoards,
    },
  }
}

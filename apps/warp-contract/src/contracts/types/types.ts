import type {
  ClaimDailyDropAction,
  ClaimDailyDropFunction,
  CreateBoardAction,
  CreateBoardFunction,
  GetOverworldMapAtTimestampAction,
  GetOverworldMapAtTimestampFunction,
  GetOverworldMapAction,
  GetOverworldMapFunction,
  GetOverworldMapResult,
  GetPlayerInventoryFunction,
  GetStickerBoardByIdAction,
  GetStickerBoardByIdFunction,
  GetStickerBoardsAction,
  GetStickerBoardsFunction,
  GetStickerBoardsResult,
  LoadGameAction,
  LoadGameFunction,
  LoadGameResult,
  GetPlayerInventoryResult,
  GetOverworldMapAtTimestampResult,
  GetStickerBoardByIdResult,
  PickStickerFunction,
  PinStickerFunction,
  PickStickerAction,
  PinStickerAction,
  GetPlayerInventoryAction,
} from '../actions'
import { MappingIdStickerBoard, OverworldMap, Player, StickerBoard } from '@gommette/types'

export interface GommetteState {
  players: Player
  stickerBoards: MappingIdStickerBoard
  overworldMap: OverworldMap
}

export type GommetteFunction =
  | LoadGameFunction
  | GetPlayerInventoryFunction
  | GetStickerBoardByIdFunction
  | GetStickerBoardsFunction
  | GetOverworldMapFunction
  | GetOverworldMapAtTimestampFunction
  | CreateBoardFunction
  | GetPlayerInventoryFunction
  | ClaimDailyDropFunction
  | PinStickerFunction
  | PickStickerFunction

export type GommetteResult =
  | GommetteState
  | GetStickerBoardByIdResult
  | GetStickerBoardsResult
  | GetOverworldMapAtTimestampResult
  | GetOverworldMapResult
  | GetPlayerInventoryResult
  | LoadGameResult
  | StickerBoard

export type GommetteAction =
  | ClaimDailyDropAction
  | CreateBoardAction
  | GetOverworldMapAction
  | GetOverworldMapAtTimestampAction
  | GetPlayerInventoryAction
  | GetStickerBoardByIdAction
  | GetStickerBoardsAction
  | LoadGameAction
  | PickStickerAction
  | PinStickerAction

export type ContractResult = { state: GommetteState } | { result: GommetteResult }

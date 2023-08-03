import type {
  ClaimDailyDropAction,
  ClaimDailyDropFunction,
  CreateBoardAction,
  CreateBoardFunction,
  GetStickerBoardByIdAction,
  GetStickerBoardByIdFunction,
  GetStickerBoardByIdResult,
  GetOverworldMapAction,
  GetOverworldMapFunction,
  GetOverworldMapResult,
  GetOverworldMapAtTimestampAction,
  GetOverworldMapAtTimestampFunction,
  GetOverworldMapAtTimestampResult,
  GetOverworldMapHistoryForLocationAction,
  GetOverworldMapHistoryForLocationFunction,
  GetOverworldMapHistoryForLocationResult,
  GetPlayerInventoryAction,
  GetPlayerInventoryFunction,
  GetPlayerInventoryResult,
  GetStickerBoardsAction,
  GetStickerBoardsFunction,
  GetStickerBoardsResult,
  LoadGameAction,
  LoadGameFunction,
  LoadGameResult,
  PickStickerFunction,
  PickStickerAction,
  PinStickerAction,
  PinStickerFunction,
} from '../actions'
import { MappingIdStickerBoard, OverworldMap, Player, StickerBoard } from '@gommette/types'

export interface GommetteState {
  players: Player
  stickerBoards: MappingIdStickerBoard
  overworldMap: OverworldMap
}

export type GommetteFunction =
  | ClaimDailyDropFunction
  | CreateBoardFunction
  | GetOverworldMapFunction
  | GetOverworldMapAtTimestampFunction
  | GetOverworldMapHistoryForLocationFunction
  | GetPlayerInventoryFunction
  | GetStickerBoardByIdFunction
  | GetStickerBoardsFunction
  | LoadGameFunction
  | PickStickerFunction
  | PinStickerFunction

export type GommetteResult =
  | GommetteState
  | GetStickerBoardByIdResult
  | GetStickerBoardsResult
  | GetOverworldMapHistoryForLocationResult
  | GetOverworldMapAtTimestampResult
  | GetOverworldMapResult
  | GetPlayerInventoryResult
  | LoadGameResult
  | StickerBoard

export type GommetteAction =
  | ClaimDailyDropAction
  | CreateBoardAction
  | GetOverworldMapAction
  | GetOverworldMapHistoryForLocationAction
  | GetOverworldMapAtTimestampAction
  | GetPlayerInventoryAction
  | GetStickerBoardByIdAction
  | GetStickerBoardsAction
  | LoadGameAction
  | PickStickerAction
  | PinStickerAction

export type ContractResult = { state: GommetteState } | { result: GommetteResult }

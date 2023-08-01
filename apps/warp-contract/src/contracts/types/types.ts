type Longitude = number
type Latitude = number
type Coordinates = [Longitude, Latitude] // longitude, latitude

interface PinnedMessage {
  author: string
  text: string
  coordinates: Coordinates
}

interface StickerBoard {
  id: string
  name: string
  uri: string
  totalQuantity: number
  availableQuantity: number
  createdAt: number
  creator?: string
}
interface StickerPickUpConditions {
  // conditions types
  // "FREE": no condition
  // "SACRIFICE": stickers required will be destroyed
  // "EXCHANGE": stickers required will be pinned on the map
  conditionType: 'FREE' | 'SACRIFICE' | 'EXCHANGE'
  stickers: {
    [key: string]: number // Sticker id <> quantity
  }
}

interface Sticker {
  id: string
  idStickerBoard: string
  pickupConditions: StickerPickUpConditions
  message?: PinnedMessage
  history: Array<PinnedMessage>
}

interface Player {
  id: string // user arweave address
  // prevent a user from claiming a sticker
  coordinates: Coordinates // verified on connect and before claiming a sticker
  inventory: Array<Sticker>
  creations: Array<StickerBoard>
  claimedDailyDropAt: number
}

interface OverworldMap {
  /**  `key` is a string version of the coordinates, for instance '[12.74,89.3]' (longitude, latitude) */
  current: {
    [key: `[${string},${string}]`]: PinnedMessage
  }
  history: Array<PinnedMessage>
}

export interface GommetteState {
  players: {}
  stickerBoards: {}
  overworldMap: {
    current: {}
    history: []
  }
}

export type GommetteResult = GommetteState
export type GommetteFunction = 'createBoard' | 'claimDailyDrop' | 'pinSticker' | 'pickSticker'

// action: `createBoard`
export interface CreateStickerBoardInput {
  function: GommetteFunction
  name: string
  uri: string
  totalQuantity: number
}

export interface CreateBoardAction {
  input: CreateStickerBoardInput
  caller: string
}

// action: `claimDailyDrop`
export interface ClaimDailyDropdInput {
  function: GommetteFunction
}

export interface ClaimDailyDropAction {
  input: ClaimDailyDropdInput
  caller: string
}

// action: `pinSticker`
export interface PinStickerInput {
  function: GommetteFunction
  idSticker: string
  text: string
  pickingConditions: StickerPickUpConditions
}

export interface PinStickerction {
  input: PinStickerInput
  caller: string
}

// action: `pickSticker`
export interface PickStickerInput {
  function: GommetteFunction
  idSticker: string
}

export interface PickStickerction {
  input: PickStickerInput
  caller: string
}

export type ContractResult = { state: GommetteState } | { result: GommetteResult }

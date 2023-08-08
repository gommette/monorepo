export type Longitude = number
export type Latitude = number
export type Coordinates = [Longitude, Latitude] // longitude, latitude

export interface PinnedMessage {
  author: string
  text: string
  coordinates: Coordinates
  createdAt: number
}

export interface StickerBoard {
  id: string
  name: string
  uri: string
  totalQuantity: number
  availableQuantity: number
  createdAt: number
  creator?: string
}
export interface MappingStickerBoardStickersQuantity {
  [key: string]: number
}

export type PickupConditionValue = 'FREE' | 'SACRIFICE' | 'EXCHANGE'
export interface StickerPickUpConditions {
  // conditions types
  // "FREE": no condition
  // "SACRIFICE": stickers required will be destroyed
  // "EXCHANGE": stickers required will be pinned on the map
  conditionType: 'FREE' | 'SACRIFICE' | 'EXCHANGE'
  stickers?: MappingStickerBoardStickersQuantity // Sticker id <> quantity
}

export interface Sticker {
  id: string
  idStickerBoard: string
  pickupConditions: StickerPickUpConditions
  message?: PinnedMessage
}

export type PlayerInventory = Array<Sticker>
export type PlayerHistory = Array<Sticker>
export type PlayerCreations = Array<StickerBoard>

export interface Player {
  id: string // user arweave address
  // prevent a user from claiming a sticker
  coordinates: Coordinates // verified on connect and before claiming a sticker
  inventory: PlayerInventory
  history: PlayerHistory
  creations: PlayerCreations
  claimedDailyDropAt?: number
}

export interface MappingIdPlayer {
  [key: string]: Player
}
export interface MappingCoordinatesSticker {
  [key: `${string},${string}`]: Sticker
}

export interface MappingOverworldMapTimestampBasedHistory {
  [key: number]: MappingCoordinatesSticker
}

export interface MappingOverworldMapLocationBasedHistory {
  [key: string]: Array<Sticker>
}

export interface MappingIdStickerBoard {
  [key: string]: StickerBoard
}
export interface OverworldMap {
  /**  `key` is a string version of the coordinates, for instance '12.74,89.3' (longitude, latitude) */
  current: MappingCoordinatesSticker
  history: {
    // timestamp based history
    time: MappingOverworldMapTimestampBasedHistory
    location: MappingOverworldMapLocationBasedHistory
  }
}

export interface AppState {
  setter: string
  players: MappingIdPlayer
  stickerBoards: MappingIdStickerBoard
  overworldMap: OverworldMap
}

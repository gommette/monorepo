import { getUnixTime } from 'date-fns'
import { Coordinates, GommetteState, Sticker, StickerPickUpConditions } from '../contracts/types'
import genesisBoards from './../stickers.json'
import * as dotenv from 'dotenv'

dotenv.config()

const boardMocked = {
  ...genesisBoards,
  'c-gHglransYmP2CjxF7xDXnvOyKPeSQmOnU1SBUxIeY': {
    ...genesisBoards['c-gHglransYmP2CjxF7xDXnvOyKPeSQmOnU1SBUxIeY'],
    availableQuantity: genesisBoards['c-gHglransYmP2CjxF7xDXnvOyKPeSQmOnU1SBUxIeY'].availableQuantity - 1,
  },
  hn4bHS4Vl7FY3mn7V2_BYfGzvQwNU9F9HamugHGZWXg: {
    ...genesisBoards['hn4bHS4Vl7FY3mn7V2_BYfGzvQwNU9F9HamugHGZWXg'],
    availableQuantity: genesisBoards['hn4bHS4Vl7FY3mn7V2_BYfGzvQwNU9F9HamugHGZWXg'].availableQuantity - 1,
  },
  '6UGuDkOp7rxGBeIkijtglsC7Zka80uCyn6de_ySPEx4': {
    ...genesisBoards['6UGuDkOp7rxGBeIkijtglsC7Zka80uCyn6de_ySPEx4'],
    availableQuantity: genesisBoards['6UGuDkOp7rxGBeIkijtglsC7Zka80uCyn6de_ySPEx4'].availableQuantity - 1,
  },
}

const mockedTimestamp = getUnixTime(new Date())

const sticker1Coordinates: Coordinates = [14.505751, 46.056946]
const sticker1: Sticker = {
  id: 'gen_001',
  idStickerBoard: 'c-gHglransYmP2CjxF7xDXnvOyKPeSQmOnU1SBUxIeY',
  pickupConditions: {
    conditionType: 'FREE',
  },
  message: {
    author: process.env.WALLET_PUBLIC_ADDRESS,
    text: 'Wow, you found me ! Congrats ! I am a sticker. Pick me up to add me to your inventory and pin me somewhere else !',
    createdAt: mockedTimestamp,
    coordinates: sticker1Coordinates,
  },
}

const sticker2Coordinates: Coordinates = [15.9667, 45.7333]
const sticker2: Sticker = {
  id: 'gen_002',
  idStickerBoard: 'hn4bHS4Vl7FY3mn7V2_BYfGzvQwNU9F9HamugHGZWXg',
  pickupConditions: {
    conditionType: 'FREE',
  },
  message: {
    author: process.env.WALLET_PUBLIC_ADDRESS,
    text: 'Wow, you found me ! Congrats ! I am a sticker. Pick me up to add me to your inventory and pin me somewhere else !',
    createdAt: mockedTimestamp,
    coordinates: sticker2Coordinates,
  },
}

const sticker3Coordinates: Coordinates = [13.3942, 45.3212]
const sticker3: Sticker = {
  id: 'gen_003',
  idStickerBoard: '6UGuDkOp7rxGBeIkijtglsC7Zka80uCyn6de_ySPEx4',
  pickupConditions: {
    conditionType: 'FREE',
  },
  message: {
    author: process.env.WALLET_PUBLIC_ADDRESS,
    text: 'Wow, you found me ! Congrats ! I am a sticker. Pick me up to add me to your inventory and pin me somewhere else !',
    createdAt: mockedTimestamp,
    coordinates: sticker3Coordinates,
  },
}

export const initialState: GommetteState = {
  setter: process.env.WALLET_PUBLIC_ADDRESS,
  players: {},
  stickerBoards: boardMocked,
  overworldMap: {
    current: {
      [sticker1Coordinates.join()]: sticker1,
      [sticker2Coordinates.join()]: sticker2,
      [sticker3Coordinates.join()]: sticker3,
    },
    history: {
      time: {
        [mockedTimestamp]: {
          [sticker2Coordinates.join()]: sticker2,
          [sticker1Coordinates.join()]: sticker1,
          [sticker3Coordinates.join()]: sticker3,
        },
      },
      location: {
        [sticker2Coordinates.join()]: [sticker2],
        [sticker1Coordinates.join()]: [sticker1],
        [sticker3Coordinates.join()]: [sticker3],
      },
    },
  },
}

export const emptyInitialState = {
  setter: process.env.WALLET_PUBLIC_ADDRESS,
  players: {},
  stickerBoards: genesisBoards,
  overworldMap: {
    current: {},
    history: {
      time: {},
      location: {},
    },
  },
}

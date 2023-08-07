import { GommetteState } from '../contracts/types'
import genesisBoards from './../stickers.json'

export const initialState: GommetteState = {
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

import { GommetteState } from '../contracts/types'
import genesisBoards from './../stickers.json'


export const initialStateEmpty: GommetteState = {
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

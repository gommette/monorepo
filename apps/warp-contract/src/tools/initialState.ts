import { getUnixTime } from 'date-fns'
import { GommetteState } from '../contracts/types'

export const initialStateEmpty: GommetteState = {
  players: {},
  stickerBoards: {},
  overworldMap: {
    current: {},
    history: {
      time: {},
      location: {},
    },
  },
}

export const initialStateWithBoards = {
  players: {},
  stickerBoards: {
    gen_smiley: {
      name: 'smiley face',
      uri: 'https://www.svgrepo.com/show/404817/beaming-face-with-smiling-eyes.svg',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_angry: {
      name: 'angry face',
      uri: 'https://www.svgrepo.com/show/404720/angry-face.svg',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_alien: {
      name: 'alien',
      uri: 'https://www.svgrepo.com/show/404711/alien.svg',
      totalQuantity: 350,
      availableQuantity: 350,
      createdAt: getUnixTime(new Date()),
    },

    gen_camera: {
      name: 'camera',
      uri: 'https://www.svgrepo.com/show/404919/camera-with-flash.svg',
      totalQuantity: 500,
      availableQuantity: 500,
      createdAt: getUnixTime(new Date()),
    },

    gen_clapping: {
      name: 'clapping',
      uri: 'https://www.svgrepo.com/show/404975/clapping-hands.svg',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_beer: {
      name: 'beer',
      uri: 'https://www.svgrepo.com/show/404982/clinking-beer-mugs.svg',
      totalQuantity: 300,
      availableQuantity: 300,
      createdAt: getUnixTime(new Date()),
    },
    gen_confused: {
      name: 'confused',
      uri: 'https://www.svgrepo.com/show/405013/confused-face.svg',
      totalQuantity: 700,
      availableQuantity: 700,
      createdAt: getUnixTime(new Date()),
    },
    gen_cool: {
      name: 'cool',
      uri: 'https://www.svgrepo.com/show/405031/cool-button.svg',
      totalQuantity: 100,
      availableQuantity: 100,
      createdAt: getUnixTime(new Date()),
    },
    gen_crying: {
      name: 'crying',
      uri: 'https://www.svgrepo.com/show/405163/crying-face.svg',
      totalQuantity: 800,
      availableQuantity: 800,
      createdAt: getUnixTime(new Date()),
    },
    gen_fire: {
      name: 'fire',
      uri: 'https://www.svgrepo.com/show/405378/fire.svg',
      totalQuantity: 1200,
      availableQuantity: 1200,
      createdAt: getUnixTime(new Date()),
    },
  },
  overworldMap: {
    current: {
      '32.99727,45.95037': {
        id: '123',
        idStickerBoard: 'gen_fire',
        pickupConditions: {
          conditionType: 'FREE',
        },
        message: {
          author: 'xyz',
          text: 'hello world',
          coordinates: [32.99727, 45.95037],
          createdAt: getUnixTime(new Date()),
        },
      },
      '47.19727,25.35027': {
        id: '8399',
        idStickerBoard: 'gen_smiley',
        pickupConditions: {
          conditionType: 'FREE',
        },
        message: {
          author: 'abc',
          text: 'sup everyone ? this is a test',
          coordinates: [47.19727, 25.35027],
          createdAt: getUnixTime(new Date()),
        },
      },
    },
    history: [
      {
        id: '123',
        idStickerBoard: 'gen_fire',
        pickupConditions: {
          conditionType: 'FREE',
        },
        message: {
          author: 'xyz',
          text: 'hello world',
          coordinates: [32.99727, 45.95037],
          createdAt: getUnixTime(new Date()),
        },
      },
      {
        id: '8399',
        idStickerBoard: 'gen_smiley',
        pickupConditions: {
          conditionType: 'FREE',
        },
        message: {
          author: 'abc',
          text: 'sup everyone ? this is a test',
          coordinates: [47.19727, 25.35027],
          createdAt: getUnixTime(new Date()),
        },
      },
    ],
  },
}

import { getUnixTime, addDays, subDays } from 'date-fns'
export const initialState = {
  players: {},
  stickerBoards: {
    gen_smiley: {
      name: 'smiley face',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_angry: {
      name: 'angry face',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_alien: {
      name: 'alien',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 350,
      availableQuantity: 350,
      createdAt: getUnixTime(new Date()),
    },

    gen_camera: {
      name: 'camera',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 500,
      availableQuantity: 500,
      createdAt: getUnixTime(new Date()),
    },

    gen_clapping: {
      name: 'clapping',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 1000,
      availableQuantity: 1000,
      createdAt: getUnixTime(new Date()),
    },
    gen_beer: {
      name: 'beer',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 300,
      availableQuantity: 300,
      createdAt: getUnixTime(new Date()),
    },
    gen_confused: {
      name: 'confused',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 700,
      availableQuantity: 700,
      createdAt: getUnixTime(new Date()),
    },
    gen_cool: {
      name: 'cool',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 100,
      availableQuantity: 100,
      createdAt: getUnixTime(new Date()),
    },
    gen_crying: {
      name: 'crying',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 800,
      availableQuantity: 800,
      createdAt: getUnixTime(new Date()),
    },
    gen_fire: {
      name: 'fire',
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png',
      totalQuantity: 1200,
      availableQuantity: 1200,
      createdAt: getUnixTime(new Date()),
    },
  },
  overworldMap: {
    current: {
      '17.110918,48.146445': {
        id: '123',
        idStickerBoard: 'gen_fire',
        pickupConditions: {
          conditionType: 'FREE',
        },
        message: {
          author: 'xyz',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac gravida massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
          coordinates: [17.110918, 48.146445],
          createdAt: getUnixTime(subDays(new Date(), 9)),
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
          createdAt: getUnixTime(subDays(new Date(), 3)),
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
          coordinates: [17.110918, 48.146445],
          createdAt: getUnixTime(subDays(new Date(), 9)),
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
          createdAt: getUnixTime(subDays(new Date(), 3)),
        },
      },
    ],
  },
}

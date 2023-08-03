import type { Config } from 'tailwindcss'

const typography = {
  fontSizeMin: 1.125,
  fontSizeMax: 1.25,
  msFactorMin: 1.125,
  msFactorMax: 1.1675,
  lineHeight: 1.6,
}

const fsMin = typography.fontSizeMin
const fsMax = typography.fontSizeMax
const msFactorMin = typography.msFactorMin
const msFactorMax = typography.msFactorMax
const screenMin = 20
const screenMax = 60

// Calc min and max font-size
const calcMulti = (multiMin = 0, multiMax = null) => {
  return {
    fsMin: fsMin * Math.pow(msFactorMin, multiMin),
    fsMax: fsMax * Math.pow(msFactorMax, multiMax || multiMin),
  }
}

// build the clamp property
const clamp = (multiMin = 0, multiMax = null) => {
  const _calcMulti = calcMulti(multiMin, multiMax || multiMin)
  const _fsMin = _calcMulti.fsMin
  const _fsMax = _calcMulti.fsMax
  return `clamp(${_fsMin}rem, calc(${_fsMin}rem + (${_fsMax} - ${_fsMin}) * ((100vw - ${screenMin}rem) / (${screenMax} - ${screenMin}))), ${_fsMax}rem)`
}

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['"Atkinson Hyperlegible", sans-serif'],
    },
    fontSize: {
      xs: clamp(-2),
      sm: clamp(-1),
      base: clamp(0),
      lg: clamp(1),
      xl: clamp(2),
      '2xl': clamp(3),
      '3xl': clamp(4),
      '4xl': clamp(5),
      '5xl': clamp(6),
      '6xl': clamp(7),
      '7xl': clamp(8),
      '8xl': clamp(9),
      '9xl': clamp(10),
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', scale: '0.8' },
          '100%': { opacity: '1', scale: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1', scale: '1' },
          '100%': { opacity: '0', scale: '0.8' },
        },
        backdropIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.7' },
        },
        backdropOut: {
          '0%': { opacity: '0.7' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(64px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(64px)' },
        },
        revolve: {
          from: {
            transform: 'rotateY(360deg)',
          },
          to: {
            transform: 'rotateY(0)',
          },
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        fadeOut: 'fadeOut 0.2s ease-in forwards',
        slideIn: 'slideIn 0.25s ease-out forwards',
        slideOut: 'slideOut 0.2s ease-in forwards',
        backdropIn: 'backdropIn 0.25s ease-out forwards',
        backdropOut: 'backdropOut 0.2s ease-in forwards',
        revolve: 'revolve 5s linear infinite',
      },
      colors: {
        primary: {
          1: '#fffcfe',
          2: '#fff7fc',
          3: '#feeef8',
          4: '#fce5f3',
          5: '#f9d8ec',
          6: '#f3c6e2',
          7: '#ecadd4',
          8: '#e38ec3',
          9: '#d6409f',
          10: '#d23197',
          11: '#cd1d8d',
          12: '#3b0a2a',
        },
        accent: {
          1: '#fdfdf9',
          2: '#fffce8',
          3: '#fffbd1',
          4: '#fff8bb',
          5: '#fef2a4',
          6: '#f9e68c',
          7: '#efd36c',
          8: '#ebbc00',
          9: '#f5d90a',
          10: '#f7ce00',
          11: '#946800',
          12: '#35290f',
        },
        complementary: {
          1: '#fcfdfa',
          2: '#f7fcf0',
          3: '#eefadc',
          4: '#e4f7c7',
          5: '#d7f2b0',
          6: '#c9e894',
          7: '#b1d16a',
          8: '#94ba2c',
          9: '#99d52a',
          10: '#93c926',
          11: '#5d770d',
          12: '#263209',
        },

        neutral: {
          1: '#fcfcfc',
          2: '#f8f8f8',
          3: '#f3f3f3',
          4: '#ededed',
          5: '#e8e8e8',
          6: '#e2e2e2',
          7: '#dbdbdb',
          8: '#c7c7c7',
          9: '#8f8f8f',
          10: '#858585',
          11: '#6f6f6f',
          12: '#171717',
        },

        'primary-neutral': {
          1: '#fdfcfd',
          2: '#f9f8f9',
          3: '#f4f2f4',
          4: '#eeedef',
          5: '#e9e8ea',
          6: '#e4e2e4',
          7: '#dcdbdd',
          8: '#c8c7cb',
          9: '#908e96',
          10: '#86848d',
          11: '#6f6e77',
          12: '#1a1523',
        },

        metal: {
          1: '#fdfdfc',
          2: '#fbf9f2',
          3: '#f5f2e9',
          4: '#eeeadd',
          5: '#e5dfd0',
          6: '#dad1bd',
          7: '#cbbda4',
          8: '#b8a383',
          9: '#978365',
          10: '#8c795d',
          11: '#776750',
          12: '#3b352b',
        },
      },
    },
  },
  plugins: [],
}

export default config

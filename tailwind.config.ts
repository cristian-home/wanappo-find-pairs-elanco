import { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['VAGRoundedBlackSSK', ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono]
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-slow-reverse': 'spin 40s linear infinite reverse'
      },
      screens: {
        xs: '480px'
      },
      colors: {
        astronaut: {
          DEFAULT: '#2C3180',
          50: '#C9CBEC',
          100: '#BABCE7',
          200: '#9B9FDD',
          300: '#7D82D2',
          400: '#5F65C8',
          500: '#4148BD',
          600: '#363D9E',
          700: '#2C3180',
          800: '#1E2156',
          900: '#0F112D',
          950: '#080918'
        },
        laser: {
          DEFAULT: '#C4A76A',
          50: '#F8F5EE',
          100: '#F2ECDF',
          200: '#E7DBC2',
          300: '#DBCAA4',
          400: '#D0B887',
          500: '#C4A76A',
          600: '#B08E46',
          700: '#886E36',
          800: '#604D26',
          900: '#382D16',
          950: '#231D0E'
        },
        'spring-wood': {
          DEFAULT: '#F8F4F1',
          50: '#FFFFFF',
          100: '#F8F4F1',
          200: '#E5D7CC',
          300: '#D3B9A6',
          400: '#C09C81',
          500: '#AD7E5B',
          600: '#8B6345',
          700: '#664933',
          800: '#402E20',
          900: '#1B130D',
          950: '#080604'
        },
        endeavour: {
          DEFAULT: '#00519F',
          50: '#A9D5FF',
          100: '#95CBFF',
          200: '#6CB7FF',
          300: '#43A3FF',
          400: '#1A8FFF',
          500: '#007BF1',
          600: '#0066C8',
          700: '#00519F',
          800: '#003467',
          900: '#00182F',
          950: '#000A13'
        },
        seagull: {
          DEFAULT: '#72BDE9',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#DCEFFA',
          300: '#B9DEF4',
          400: '#95CEEF',
          500: '#72BDE9',
          600: '#41A6E1',
          700: '#208CCB',
          800: '#186A9B',
          900: '#11496A',
          950: '#0D3852'
        },
        cerulean: {
          DEFAULT: '#00BBEF',
          50: '#A8ECFF',
          100: '#93E8FF',
          200: '#6ADFFF',
          300: '#42D6FF',
          400: '#19CDFF',
          500: '#00BBEF',
          600: '#008FB7',
          700: '#00637F',
          800: '#003747',
          900: '#000B0F',
          950: '#000000'
        },
        'moon-raker': {
          DEFAULT: '#CBD7F5',
          50: '#FFFFFF',
          100: '#FEFEFF',
          200: '#EDF2FC',
          300: '#DCE4F8',
          400: '#CBD7F5',
          500: '#A0B5ED',
          600: '#7593E5',
          700: '#4B71DC',
          800: '#2751CD',
          900: '#1F3FA2',
          950: '#1B368C'
        },
        mauvelous: {
          DEFAULT: '#F283B4',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FEF2F7',
          300: '#FACDE1',
          400: '#F6A8CA',
          500: '#F283B4',
          600: '#ED5095',
          700: '#E71D77',
          800: '#B9135D',
          900: '#860E43',
          950: '#6D0B37'
        },
        'light-orchid': {
          DEFAULT: '#DDA6CC',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#F4E1EE',
          400: '#E8C4DD',
          500: '#DDA6CC',
          600: '#CD7DB5',
          700: '#BE559D',
          800: '#9E3C80',
          900: '#762D5F',
          950: '#61254F'
        },
        ebb: {
          DEFAULT: '#EFECEA',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#EFECEA',
          600: '#D7CFCA',
          700: '#BEB2AA',
          800: '#A6968A',
          900: '#8D796C',
          950: '#7D6B5F'
        },
        'spring-green': {
          DEFAULT: '#00EF8A',
          50: '#A8FFDA',
          100: '#93FFD1',
          200: '#6AFFC0',
          300: '#42FFAF',
          400: '#19FF9E',
          500: '#00EF8A',
          600: '#00B76A',
          700: '#007F49',
          800: '#004729',
          900: '#000F08',
          950: '#000000'
        }
      }
    }
  },
  plugins: []
} satisfies Config

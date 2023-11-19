import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

const convertColors = (colors, prefix = '') => {
  let convertedColors = {};

  for (const key in colors) {
    const value = colors[key];
    const newKey = (key !== '') ? (prefix ? `${prefix}-${key}` : key) : prefix;

    if (typeof value === 'string') {
      convertedColors[newKey] = value;
    } else if (typeof value === 'object') {
      convertedColors = { ...convertedColors, ...convertColors(value, newKey) };
    }
  }

  return convertedColors;
};

export default defineConfig({
  theme: {
    colors: convertColors({
      'black': '#000000',
      'brand': '#FF0000',

      'white-dark': '#FAFAFA',
      'white-dark-pressed': '#F4F4F4',

      'primary': {
        black: '#333333',
        white: '#FFFFFF',
      },

      'secondary': {
        black: '#707070',
        white: '#D1D1D1',
      },

      'tertiary': {
        black: '#A3A3A3',
        white: '#A3A3A3',
      },

      'success': {
        '': '#78E000',
        'dark': '#50C200',
        'darker': '#2FA400',
        'light': '#9AE94D',
      },

      'warning': {
        '': '#FFC107',
        'dark': '#E39D06',
        'darker': '#C77D06',
        'light': '#FFD249',
      },

      'danger': {
        '': '#EB0075',
        'dark': '#C80063',
        'darker': '#A50052',
        'light': '#F14B9E',
      },

      'info': {
        '': '#0E4DFF',
        'dark': '#0039D5',
        'darker': '#0028AB',
        'light': '#527FFF',
      },
    }),
  },
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})

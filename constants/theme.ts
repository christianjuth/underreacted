import { theme } from '../types';

const light: theme = {
  dark: false,
  colors: {
    primary: '#000',
    accent: '#F7E9EF',
    background: '#F1F5FB',
    surface: '#fff',
    text: 'rgba(0, 0, 0, 0.85)',
    textMuted: 'rgb(124, 117, 116)',
    divider: 'rgba(100, 100, 100, 0.2)'
  },
  insets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  roundness: 10
}

const dark: theme = {
  ...light,
  dark: true,
  colors: {
    ...light.colors,
    background: '#080808',
    surface: '#222',
    primary: '#ffbe76',
    text: '#fff',
    divider: 'rgba(255, 255, 255, 0.2)'
  }
};

export default {
  light,
  dark
};
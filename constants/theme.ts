import { theme } from '../types';

const light: theme = {
  dark: false,
  colors: {
    primary: '#3c40c6',
    accent: 'rgba(0,0,0,0.25)',
    background: '#fff',
    surface: '#fff',
    text: '#000',
    textMuted: 'rgba(0,0,0,0.4)',
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
    background: '#02000c',
    surface: '#222',
    primary: '#ffbe76',
    accent: '#ffffff',
    text: 'rgba(255, 255, 255, 0.9)',
    textMuted: 'rgba(255,255,255,0.6)',
    divider: 'rgba(255, 255, 255, 0.2)'
  }
};

export default {
  light,
  dark
};
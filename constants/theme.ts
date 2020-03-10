
import { Theme, defaultTheme, colors } from 'react-context-theming';

const dark: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#020917',
    surface: '#222',
    primary: '#fa65c5',
    accent: '#ffffff',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    divider: 'rgba(255, 255, 255, 0.2)'
  },
  dark: true,
  roundness: 10
};

export default {
  dark
};
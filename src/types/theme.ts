export type theme = {
  dark: boolean,
  colors: {
    primary: string,
    accent: string,
    background: string,
    surface: string,
    text: string,
    textMuted: string,
    divider: string
  },
  insets: {
    top: number,
    right: number,
    bottom: number,
    left: number
  },
  roundness: number
}
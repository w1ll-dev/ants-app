import 'styled-componets';

interface Colors {
  red: string;
  silver: string;
  black: string;
  background: string;
}

interface Fonts {
  default: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    fonts: Fonts;
  }
}

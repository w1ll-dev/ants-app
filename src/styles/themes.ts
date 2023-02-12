import { DefaultTheme } from 'styled-components';
import { Colors } from '../types/styled';

const darkColors: Colors = {
  black: '#000',
  red: '#FF0000',
  silver: '#C0C0C0',
  background: '#FFFFFF'
};

const lightColors: Colors = {
  black: '#000',
  red: '#FF0000',
  silver: '#C0C0C0',
  background: '#FFFFFF'
};

const fonts = {
  default: 'space-mono'
};

const dark: DefaultTheme = {
  colors: darkColors,
  fonts
};

const light: DefaultTheme = {
  colors: lightColors,
  fonts
};

const themes = { dark, light };

export default themes;

import { useColorScheme } from 'react-native';
import themes from '../styles/themes';

const useNativeTheme = () => {
  const deviceTheme = useColorScheme() || 'light';
  const theme = themes[deviceTheme];

  return theme;
};

export default useNativeTheme;

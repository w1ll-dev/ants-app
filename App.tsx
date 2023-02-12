import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';
import useCachedResources from './src/hooks/useCachedResources';
import useNativeTheme from './src/hooks/useTheme';
import Navigation from './src/navigation';

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = useNativeTheme();

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient} contextSharing>
        <ThemeProvider theme={theme}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

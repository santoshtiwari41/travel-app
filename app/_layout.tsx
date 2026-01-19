import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import { ThemeProvider as AppThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css'

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppThemeProvider>
      <ThemeConsumerLayout systemScheme={colorScheme ?? null} />
    </AppThemeProvider>
  );
}

function ThemeConsumerLayout({ systemScheme }: { systemScheme: 'light' | 'dark' | null }) {
  const { theme } = useTheme();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      {theme === 'dark' ? <StatusBar barStyle="light-content" backgroundColor="#09090b" /> :
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      }
      <View className={theme === 'dark' ? 'dark flex-1' : 'flex-1'} style={{ flex: 1 }}>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
        </Stack>


      </View>
    </ThemeProvider>
  );
}

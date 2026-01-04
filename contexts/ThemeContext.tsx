import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { useColorScheme as useSystemColorScheme } from '@/hooks/use-color-scheme';

type ThemeName = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'APP_THEME';
const isWeb = Platform.OS === 'web';

async function getStoredValue(key: string) {
  try {
    if (isWeb) {
      if (typeof window !== 'undefined') return window.localStorage.getItem(key);
      return null;
    }
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    return null;
  }
}

async function setStoredValue(key: string, value: string) {
  try {
    if (isWeb) {
      if (typeof window !== 'undefined') window.localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    // ignore write errors
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSystemColorScheme() ?? 'light';
  const [theme, setThemeState] = useState<ThemeName>(system as ThemeName);

  useEffect(() => {
    // load saved theme (if any)
    (async () => {
      try {
        const v = await getStoredValue(STORAGE_KEY);
        if (v === 'light' || v === 'dark') {
          setThemeState(v as ThemeName);
        } else {
          setThemeState(system as ThemeName);
        }
      } catch (e) {
        setThemeState(system as ThemeName);
      }
    })();
    // if system theme changes and user hasn't set a pref, adopt it
  }, [system]);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    setStoredValue(STORAGE_KEY, t);
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;

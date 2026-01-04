import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800"
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
    >
      <Text className="text-black dark:text-white text-sm">
        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
      </Text>
    </Pressable>
  );
}

import { Stack } from 'expo-router';
import React from 'react';

export default function MainLayout() {

  return (
      <Stack 
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="tabs" />
        <Stack.Screen name="stack" />
      </Stack>
  );
}

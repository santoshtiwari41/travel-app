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
            <Stack.Screen name="stack/profile" />
            <Stack.Screen name="stack/flights" />
            <Stack.Screen name="stack/hotels" />
            <Stack.Screen name="stack/foods" />
            <Stack.Screen name="stack/rentals" />
            <Stack.Screen name="stack/tours" />
            <Stack.Screen name="stack/friends" />
            <Stack.Screen name="stack/chat/[id]" />

        </Stack>
    );
}

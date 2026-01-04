import React from 'react'
import { Text, View } from 'react-native'
import ThemeToggle from '@/components/theme-toggle'

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <ThemeToggle />
      <Text className="mt-4 text-black dark:text-white">home</Text>
    </View>
  )
}

export default Home
import { Button } from '@/components/ui/button'
import React from 'react'
import { Text, View } from 'react-native'

const login = () => {
  return (
    <View className='mt-10 flex gap-10'>
      <Text className='bg-red-500'>login</Text>
      <Button
        title="Delete"
        variant="destructive"
        size="lg"
      />    
      </View>
  )
}

export default login
import { Button } from '@/components/ui/button'
import React from 'react'
import { Text, View } from 'react-native'

const login = () => {
  return (
    <View>
      <Text className='bg-red-500'>login</Text>
      <Button variant="custom">Login</Button>
    </View>
  )
}

export default login
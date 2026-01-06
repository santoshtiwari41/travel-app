import { View } from 'react-native'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'expo-router'

const Profile = () => {
  const router=useRouter();
  return (
    <View className='flex-1 justify-center align-center'>
     <Button title="Log out" onPress={() => {router.replace('/login')}} variant="destructive" />
    </View>
  )
}

export default Profile
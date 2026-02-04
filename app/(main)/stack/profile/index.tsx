import { View } from 'react-native'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
const Profile = () => {
  const router=useRouter();
  const handleLogut=async()=>{
   await SecureStore.deleteItemAsync('auth-token');
   router.replace('/(auth)/login')
  }
  return (
    <View className='flex-1 justify-center align-center'>
     <Button title="Log out" onPress={handleLogut} variant="destructive" />
    </View>
  )
}

export default Profile
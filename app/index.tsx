import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const Index = () => {
const [token, setToken] = useState('')
  useEffect(() => {
    async function getToken() {
      const token = await SecureStore.getItemAsync('auth-token');
      if (token) {
        setToken(token)
      }
    }
    getToken()
  }, [])
    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }
    else{
        return <Redirect href="/(main)/tabs/home" />;
    }
    
}

export default Index
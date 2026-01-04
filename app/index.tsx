import { Redirect } from 'expo-router';
import React from 'react';

const index = () => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }
    else{
        return <Redirect href="/(tabs)/home" />;
    }
    
}

export default index
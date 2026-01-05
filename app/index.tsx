import { Redirect } from 'expo-router';
import React from 'react';

const index = () => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }
    else{
        return <Redirect href="/(main)/tabs/home" />;
    }
    
}

export default index
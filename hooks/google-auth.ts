import { googleLogin } from '@/api/auth';
import { getPushToken } from '@/services/asyncStorage';
import { configureGoogleSignIn, signInWithGoogle } from '@/utils/google-signin';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';

export const useGoogleAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.idToken) {
        setIsLoading(true);
        
        const expoPushToken = (await getPushToken()) ?? undefined;
        
        await googleLogin(result.idToken, expoPushToken);
        
          router.replace('/(main)/tabs/home');
      } else {
        if (result.error !== 'User cancelled the sign-in flow') {
          Alert.alert('Google Sign-In', result.error || 'Failed to sign in.');
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Google auth error:', error);
      setIsLoading(false);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  }, [router]);

  return {
    signInWithGoogle: handleGoogleSignIn,
    isLoading,
  };
};
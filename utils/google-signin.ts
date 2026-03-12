//@ts-nocheck
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '402966697285-famj689erdtcs9lob1pmul4qq2tad6ta.apps.googleusercontent.com', 
    scopes: ['profile', 'email'],
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    
    const userInfo = await GoogleSignin.signIn() as any;
    
    const tokens = await GoogleSignin.getTokens();
    
    return {
      idToken: tokens.idToken,
      serverAuthCode: userInfo.serverAuthCode,
      success: true,
    };
  } catch (error: any) {
    
    if (error.code === 'SIGN_IN_CANCELLED') {
      return {
        success: false,
        error: 'User cancelled the sign-in flow',
      };
    } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
      return {
        success: false,
        error: 'Google Play Services not available',
      };
    } else {
      return {
        success: false,
        error: error.message || 'Google Sign-In failed',
      };
    }
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Google Sign-Out failed',
    };
  }
};

export const isSignedIn = async () => {
  try {
    return await GoogleSignin.getCurrentUser() !== null;
  } catch (error) {
    console.error('Check sign-in status error:', error);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    return await GoogleSignin.getCurrentUser();
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}; 
import { apiClient } from "./client";
import * as SecureStore from 'expo-secure-store';

interface User {
  fullName?: string;
  email: string;
  password: string;
  expoPushToken?: string;
}
export const login = async ({ user }: { user: User }) => {

  const res = await apiClient.post('/auth/login', {
    email: user.email,
    password: user.password

  })
  await SecureStore.setItemAsync('auth-token', res.data.token);

}

export const signUp = async ({ user }: { user: User }) => {
  const res=await apiClient.post('/auth/register', {
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    expoPushToken: user.expoPushToken

  })
  return res.data
}


export interface GoogleAuthResponse {
  message: string;
  token: string;
}

export async function googleLogin(idToken: string, expoPushToken?: string) {
  try {
    const response = await apiClient.post('/auth/google/callback', {
      idToken: idToken,
      expoPushToken: expoPushToken
    });
    await SecureStore.setItemAsync('auth-token', response.data.token);
    return response.data as GoogleAuthResponse;
  } catch (error: any) {
    console.error('Google login error:', error);
    throw error;
  }
}

export async function initiateGoogleAuth() {
  try {
    const response = await apiClient.get('/auth/google/login');
    return response.data;
  } catch (error: any) {
    console.error('Google auth initiation error:', error);
    throw error;
  }
}

export async function OTPVerify({ otp, token }: { otp: string; token: string }) {
  const response = await apiClient.post('/auth/verify', {
    otp,
    token
  });
  return response.data;
}
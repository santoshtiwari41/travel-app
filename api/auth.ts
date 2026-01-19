import { apiClient } from "./client";
import * as SecureStore from 'expo-secure-store';

interface User{
    fullName?:string;
    email:string;
    password:string;
}
export const login =async({user}:{user:User})=>{

   const res=await apiClient.post('/auth/login',{
        email:user.email,
        password:user.password
        
    })
    await SecureStore.setItemAsync('auth-token', res.data.token);
 
}

export const signUp=async({user}:{user:User})=>{
  await apiClient.post('/auth/register',{
        fullName:user.fullName,
        email:user.email,
        password:user.password
        
    })
}
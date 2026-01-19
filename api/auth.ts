import { apiClient } from "./client";

interface User{
    fullName?:string;
    email:string;
    password:string;
}
export const login =async({user}:{user:User})=>{



}


export const signUp=async({user}:{user:User})=>{
    const res=await apiClient.post('/auth/register',{

        email:user.email,
        
    })
}
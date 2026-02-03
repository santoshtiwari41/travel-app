import { apiClient } from "./client";

export async function getUsers(query:string){
     if (!query || query.trim().length < 2) return [];
    const users=await apiClient.get('/users',{
          params: { search: query }
    })
    return users.data || []
}
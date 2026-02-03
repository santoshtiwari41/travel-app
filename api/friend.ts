import { apiClient } from "./client";

export async function sendFriendRequest(receiverId:string){
    const response=await apiClient.post('/friends/request',{
    receiverId
    })
    return response.data
}

export async function acceptFriendRequest(requestId:string){
    
    const response=await apiClient.post(`/friends/request/${requestId}/accept`)
    return response.data

}

export async function declineFriendRequest(requestId:string){
    const response=await apiClient.post(`/friends/request/${requestId}/reject`)
    return response.data

}

export async function getFriendRequest(){
    const res=await apiClient.get('/friends/request')
    return res?.data || []
}

export async function getFriendsList(){
    const res=await apiClient.get('/friends');
    return res?.data ||[]
}
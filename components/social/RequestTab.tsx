import { FlatList } from 'react-native'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { acceptFriendRequest, declineFriendRequest, getFriendRequest } from '@/api/friend'
import { FriendRequestCard } from './FriendRequestCard'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

const RequestsTab = () => {
  const queryClient = useQueryClient()
  const { data,refetch,isRefetching } = useQuery({ queryKey: ['friend-request'], queryFn: getFriendRequest })
  const acceptMutation = useMutation({
    mutationKey: ['friend-request'],
    mutationFn: acceptFriendRequest,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['friend-request'] });

      queryClient.invalidateQueries({ queryKey: ['friend-list'] });

      Toast.show({
        type: 'success',
        text1: 'Accepted!',
      })
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: ' Failed',
      })
    }
  })

const rejectMutation = useMutation({
    mutationKey: ['friend-request'],
    mutationFn: declineFriendRequest,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['friend-request'] });

      queryClient.invalidateQueries({ queryKey: ['friend-list'] });

      Toast.show({
        type: 'success',
        text1: 'Rejected!',
      })
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: ' Failed',
      })
    }
  })

  const router = useRouter()
  const acceptRequest = (requestId: string) => {
    acceptMutation.mutate(requestId)
  }
  const rejectRequest = (requestId: string) => {
    rejectMutation.mutate(requestId)
  }
 
  return (
    <FlatList
      data={data}
      refreshing={isRefetching}
      onRefresh={refetch}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FriendRequestCard
          friend={item}
          onPress={() => router.push({
            pathname: '/(main)/stack/chat/[id]',
            params: { id: item.id, name: item.fullName }
          })}
          onAcceptFriend={() => acceptRequest(item.id)}
          onDelete={()=> rejectRequest(item.id)}
          acceptPending={acceptMutation.isPending}
          deletingPending={rejectMutation.isPending}
        />
      )}
    />
  )
}

export default RequestsTab
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChatFriendCard } from './ChatFriendCard';
import { useQuery } from '@tanstack/react-query';
import { getFriendsList } from '@/api/friend';



export default function MessagesTab() {
  const { data = [], isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['friend-list'],
    queryFn: getFriendsList,
  });
  const router = useRouter()
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" animating={isLoading} />
      </View>
    )
  }
  if (data.length === 0) {
    return (
      <View>
        <Text className="text-lg text-black dark:text-white">
          You have no friends yet ...
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      refreshing={isRefetching}
      onRefresh={refetch}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatFriendCard
          friend={item}
          onPress={() => router.push({
            pathname: '/(main)/stack/chat/[id]',
            params: { id: item.id, name: item.fullName }
          })}
        />
      )}
    />
  );
}
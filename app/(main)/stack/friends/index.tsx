// app/(main)/stack/friends/index.tsx
import { useEffect, useState, useMemo } from 'react';
import { View, TextInput, Text, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FriendCard } from '@/components/social/FriendCard';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/user';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: results, isLoading } = useQuery({
    queryKey: ['user', debouncedQuery],
    queryFn: () => getUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  const friendsList = useMemo(() => (Array.isArray(results) ? results : []), [results]);

  const handleUserPress = (user: any) => {
    if (user.isSelf) {
      router.push('/(main)/stack/profile');
    } else if (user.isFriend) {
      router.push({
        pathname: '/(main)/stack/chat/[id]',
        params: { id: user.id, name: user.fullName }
      });
    } else {
      console.log("Not friends yet. Click 'Add Friend' to connect.");
    }
  };

  const handleAddFriend = (id: string) => {
    console.log("Sending friend request to:", id);
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-4 pt-12">
      <View className="flex-row items-center bg-white/70 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl px-4 mb-6">
        <Ionicons name="search" size={20} color="#71717a" />
        <TextInput
          placeholder="Search for people..."
          placeholderTextColor="#71717a"
          className="flex-1 h-12 ml-2 text-slate-900 dark:text-white"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="flex-1">
        <Text className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-4 ml-1">
          {isLoading ? 'Searching...' : 'Search Results'}
        </Text>

        {isLoading ? (
          <ActivityIndicator size="small" color="#3b82f6" className="mt-10" />
        ) : (
          <FlatList
            data={friendsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <FriendCard 
                friend={item} 
                onPress={() => handleUserPress(item)}
                onAddFriend={() => handleAddFriend(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <View className="mt-10 items-center">
                <Text className="text-slate-400 dark:text-zinc-600 italic text-center">
                  {debouncedQuery.length < 2 
                    ? "Type at least 2 characters to search..." 
                    : "No matches found."}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
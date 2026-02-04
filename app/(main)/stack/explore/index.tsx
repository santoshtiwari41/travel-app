import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, 
  ActivityIndicator, useColorScheme, Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useQuery } from '@tanstack/react-query';
import { fetchCities } from '@/api/search';

export default function ExploreScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
 
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);


const handleCitySelect = (item: any) => {
  router.push({
    pathname: '/(main)/stack/create-trip',
    params: { 
      cityId: item.id, 
      cityName: item.city,
      country: item.country 
    }
  });
  Keyboard.dismiss();
};


  const { data: results, isLoading } = useQuery({
    queryKey: ['city-search', debouncedQuery],
    queryFn: () => fetchCities(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  return (
    <View className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <View 
        style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: '#6366f1', opacity: 0.15 }} 
      />

      <SafeAreaView className="flex-1">
        <View className="px-5 pb-4 pt-2">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="mb-4 w-10 h-10 items-center justify-center rounded-full bg-white/50 dark:bg-zinc-800/50 border border-white/20 dark:border-zinc-700/30"
          >
            <Feather name="chevron-left" size={24} color={isDark ? "#fff" : "#1e293b"} />
          </TouchableOpacity>

          <Text className="text-3xl font-black text-slate-900 dark:text-white mb-5 tracking-tight">
            Where to?
          </Text>

          <BlurView
            intensity={isDark ? 20 : 40}
            tint={isDark ? 'dark' : 'light'}
            className="flex-row items-center px-4 h-16 rounded-[24px] border border-white/40 dark:border-zinc-800/50 overflow-hidden shadow-xl shadow-indigo-500/10"
          >
            <Feather name="search" size={20} color="#6366f1" />
            <TextInput
              placeholder="Search destination..."
              placeholderTextColor={isDark ? "#71717a" : "#94a3b8"}
              className={`flex-1 ml-3 text-lg font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {isLoading && <ActivityIndicator size="small" color="#6366f1" />}
          </BlurView>
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 }}
          ListEmptyComponent={() => (
            !isLoading && debouncedQuery.length >= 2 ? (
              <View className="mt-20 items-center">
                <MaterialCommunityIcons name="map-marker-off-outline" size={60} color="#cbd5e1" />
                <Text className="text-slate-400 font-bold mt-4">No cities found</Text>
              </View>
            ) : null
          )}
          renderItem={({ item }) => (
            <TouchableOpacity 
             onPress={() => handleCitySelect(item)}
              activeOpacity={0.8}
              className="mb-3"
            >
              <BlurView
                intensity={isDark ? 10 : 60}
                tint={isDark ? 'dark' : 'default'}
                className="flex-row items-center p-4 rounded-[28px] border border-white/30 dark:border-zinc-800/40 overflow-hidden"
              >
                <View className="w-12 h-12 items-center justify-center rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20">
                  <Ionicons name="location" size={22} color="#6366f1" />
                </View>
                
                <View className="ml-4 flex-1">
                  <Text className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.city}
                  </Text>
                  <Text className="text-slate-500 dark:text-zinc-500 text-xs font-medium uppercase tracking-wider">
                    {item.country} • {item.iso2}
                  </Text>
                </View>

                <View className="w-8 h-8 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800">
                  <Feather name="arrow-up-right" size={16} color="#6366f1" />
                </View>
              </BlurView>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    
    </View>
  );
}
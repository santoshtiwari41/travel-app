import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MessagesTab from '@/components/social/MessageTab';
import RequestsTab from '@/components/social/RequestTab';

export default function SocialScreen() {
  const [activeTab, setActiveTab] = useState<'messages' | 'requests'>('messages');
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-4 pt-14">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-3xl font-black text-slate-900 dark:text-white">Social</Text>
        <TouchableOpacity 
          onPress={() => router.push("/(main)/stack/friends")}
          className="w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm"
        >
          <Ionicons name="search" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <View className="flex-row mb-6 bg-slate-200/50 dark:bg-zinc-900 p-1 rounded-2xl">
        <TouchableOpacity 
          onPress={() => setActiveTab('messages')}
          className={`flex-1 py-3 rounded-xl ${activeTab === 'messages' ? 'bg-white dark:bg-zinc-800' : ''}`}
        >
          <Text className={`text-center font-bold ${activeTab === 'messages' ? 'text-blue-500' : 'text-slate-400'}`}>
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('requests')}
          className={`flex-1 py-3 rounded-xl ${activeTab === 'requests' ? 'bg-white dark:bg-zinc-800' : ''}`}
        >
          <Text className={`text-center font-bold ${activeTab === 'requests' ? 'text-blue-500' : 'text-slate-400'}`}>
            Requests
          </Text>
        </TouchableOpacity>
      </View>

          <View className="flex-1">
        <View style={{ display: activeTab === 'messages' ? 'flex' : 'none', flex: 1 }}>
          <MessagesTab />
        </View>
        
        <View style={{ display: activeTab === 'requests' ? 'flex' : 'none', flex: 1 }}>
          <RequestsTab/>
        </View>
      </View>
    </View>
  );
}
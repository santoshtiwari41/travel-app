import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Heart, MessageCircle, UserPlus, CheckCheck, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const NOTIFICATIONS = [
  { id: 1, type: 'like', title: 'New Like', message: 'Sarah liked your post "Liquid Design"', time: '2m ago', icon: <Heart size={18} color="#ef4444" />, read: false },
  { id: 2, type: 'comment', title: 'New Comment', message: 'Jason commented: "This looks amazing!"', time: '1h ago', icon: <MessageCircle size={18} color="#6366f1" />, read: false },
  { id: 3, type: 'follow', title: 'New Follower', message: 'Digital Nomad started following you.', time: '5h ago', icon: <UserPlus size={18} color="#10b981" />, read: true },
];

export default function Notifications() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-6 pt-16">
      {/* --- Header --- */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-900/50 border border-white/60 dark:border-zinc-800/50 items-center justify-center"
        >
          <ChevronLeft size={24} color="#6366f1" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 dark:text-zinc-100">Notifications</Text>
        <TouchableOpacity>
          <CheckCheck size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>

      {/* --- Glass Filter Chips --- */}
      <View className="flex-row gap-x-2 mb-8">
        {['All', 'Unread', 'Mentions'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            className={`px-5 py-2 rounded-full border ${
              filter === item 
                ? 'bg-indigo-600 border-indigo-500 shadow-md shadow-indigo-500/30' 
                : 'bg-white/40 dark:bg-zinc-900/40 border-white/60 dark:border-zinc-800/50'
            }`}
          >
            <Text className={`font-medium ${filter === item ? 'text-white' : 'text-slate-500 dark:text-zinc-400'}`}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* --- Notification List --- */}
        <View className="gap-y-4">
          {NOTIFICATIONS.map((notif) => (
            <NotificationCard key={notif.id} notif={notif} />
          ))}
        </View>

        {/* --- Empty State Placeholder (Liquid Glass Info Box) --- */}
        <View className="mt-10 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-800 items-center justify-center">
          <Bell size={32} color="#94a3b8" />
          <Text className="text-slate-400 dark:text-zinc-500 mt-4 text-center">
            You're all caught up! No more notifications.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const NotificationCard = ({ notif }: { notif: any }) => (
  <TouchableOpacity 
    activeOpacity={0.7}
    className={`flex-row p-4 rounded-3xl border ${
      notif.read 
        ? 'bg-white/20 dark:bg-zinc-900/20 border-white/30 dark:border-zinc-800/20' 
        : 'bg-white/60 dark:bg-zinc-900/60 border-white dark:border-zinc-700/50 shadow-sm'
    }`}
  >
    <View className={`w-12 h-12 rounded-2xl items-center justify-center ${notif.read ? 'bg-slate-100 dark:bg-zinc-800' : 'bg-indigo-50 dark:bg-indigo-900/30'}`}>
      {notif.icon}
    </View>
    
    <View className="flex-1 ml-4">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-bold text-slate-900 dark:text-zinc-100">{notif.title}</Text>
        <Text className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">{notif.time}</Text>
      </View>
      <Text className="text-slate-600 dark:text-zinc-400 text-sm leading-5" numberOfLines={2}>
        {notif.message}
      </Text>
    </View>

    {!notif.read && (
      <View className="justify-center ml-2">
        <View className="w-2 h-2 rounded-full bg-indigo-500" />
      </View>
    )}
  </TouchableOpacity>
);
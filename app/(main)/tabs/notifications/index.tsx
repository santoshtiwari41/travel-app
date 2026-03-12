import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, CheckCheck, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotifications, readAllNotifications, readNotification } from '@/api/notification';

export default function Notifications() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  const notifications = data?.notifications ?? [];

  const readAll = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const readOne = useMutation({
    mutationFn: (id: string) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  React.useEffect(() => {
    // When opening the notifications screen, mark all as read
    if (!isLoading) readAll.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
        <TouchableOpacity onPress={() => readAll.mutate()}>
          <CheckCheck size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* --- Notification List --- */}
        {isLoading ? (
          <Text className="text-slate-400 dark:text-zinc-500 text-center mt-10">
            Loading notifications...
          </Text>
        ) : notifications.length > 0 ? (
          <View className="gap-y-4">
            {notifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                notif={notif}
                onPress={() => readOne.mutate(notif.id)}
              />
            ))}
          </View>
        ) : (
          <View className="gap-y-4" />
        )}

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

const NotificationCard = ({ notif, onPress }: { notif: any; onPress: () => void }) => (
  <TouchableOpacity 
    activeOpacity={0.7}
    onPress={onPress}
    className={`flex-row p-4 rounded-3xl border ${
      notif.read 
        ? 'bg-white/20 dark:bg-zinc-900/20 border-white/30 dark:border-zinc-800/20' 
        : 'bg-white/60 dark:bg-zinc-900/60 border-white dark:border-zinc-700/50 shadow-sm'
    }`}
  >
      <View className={`w-12 h-12 rounded-2xl items-center justify-center ${notif.read ? 'bg-slate-100 dark:bg-zinc-800' : 'bg-indigo-50 dark:bg-indigo-900/30'}`}>
        <Bell size={18} color="#6366f1" />
      </View>
    
    <View className="flex-1 ml-4">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="font-bold text-slate-900 dark:text-zinc-100">{notif.title}</Text>
        <Text className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
          {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ''}
        </Text>
      </View>
      <Text className="text-slate-600 dark:text-zinc-400 text-sm leading-5" numberOfLines={2}>
        {notif.body}
      </Text>
    </View>

    {!notif.read && (
      <View className="justify-center ml-2">
        <View className="w-2 h-2 rounded-full bg-indigo-500" />
      </View>
    )}
  </TouchableOpacity>
);
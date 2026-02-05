import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LogOut, User, Settings, Shield, Bell, ChevronRight, ChevronLeft } from 'lucide-react-native';

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('auth-token');
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-6 pt-16">
      
      <ScrollView showsVerticalScrollIndicator={false}>
         <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/50 dark:bg-zinc-900/50 border border-white/60 dark:border-zinc-800/50 items-center justify-center"
          >
            <ChevronLeft size={24} color="#6366f1" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-900 dark:text-zinc-100">Profile</Text>
          <View className="w-10" /> 
        </View>
        <View className="items-center mb-8">
          <View className="p-1 rounded-full border-2 border-blue-500/30">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200' }}
              className="w-24 h-24 rounded-full"
            />
          </View>
          <Text className="text-2xl font-bold mt-4 text-slate-900 dark:text-zinc-100">Alex Rivers</Text>
          <Text className="text-slate-500 dark:text-zinc-400">alex.rivers@design.com</Text>
        </View>

        <View className="gap-4">
          <ProfileItem 
            icon={<User size={20} color="#6366f1" />} 
            label="Edit Profile" 
            onPress={() => router.push('/(main)/stack/edit')} 
          />
          <ProfileItem 
            icon={<Bell size={20} color="#f59e0b" />} 
            label="Notifications" 
            onPress={() => router.push('/(main)/stack/notifications')} 
          />
          <ProfileItem 
            icon={<Shield size={20} color="#10b981" />} 
            label="Privacy & Security" 
            onPress={() => router.push('/(main)/stack/privacy')} 
          />
          <ProfileItem 
            icon={<Settings size={20} color="#64748b" />} 
            label="App Settings" 
            onPress={() => router.push('/(main)/stack/settings')} 
          />

          <TouchableOpacity 
            onPress={handleLogout}
            className="mt-6 rounded-2xl border border-red-200/50 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 p-4 flex-row items-center justify-center"
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-semibold text-lg">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const ProfileItem = ({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    activeOpacity={0.7}
    className="flex-row items-center p-4 rounded-2xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 shadow-sm"
  >
    <View className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 items-center justify-center">
      {icon}
    </View>
    <Text className="ml-4 flex-1 text-slate-700 dark:text-zinc-200 font-medium text-base">{label}</Text>
    <ChevronRight size={18} color="#94a3b8" />
  </TouchableOpacity>
);

export default Profile;
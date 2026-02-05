import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Globe, Moon, Database, HardDrive, ChevronRight, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AppSettings() {
  const router=useRouter()
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
          <Text className="text-xl font-bold text-slate-900 dark:text-zinc-100">Edit Profile</Text>
          <View className="w-10" /> 
        </View>

        <Text className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3 ml-2">Preferences</Text>
        
        <View className="rounded-3xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 overflow-hidden mb-8">
          <SettingsRow icon={<Globe size={20} color="#94a3b8" />} label="Language" value="English" />
          <View className="h-[1px] bg-slate-200/50 dark:bg-zinc-800/50 mx-4" />
          <SettingsRow icon={<Moon size={20} color="#94a3b8" />} label="Theme" value="System" />
        </View>

        <Text className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3 ml-2">Storage</Text>
        <View className="rounded-3xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 overflow-hidden mb-8">
          <SettingsRow icon={<Database size={20} color="#94a3b8" />} label="Clear Cache" value="124 MB" />
          <View className="h-[1px] bg-slate-200/50 dark:bg-zinc-800/50 mx-4" />
          <SettingsRow icon={<HardDrive size={20} color="#94a3b8" />} label="Download Quality" value="High" />
        </View>

        <View className="items-center mt-4">
          <View className="px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-100/50 dark:bg-zinc-900/50">
            <Text className="text-slate-400 dark:text-zinc-500 text-xs font-medium">Version 2.4.0-liquid</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const SettingsRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <TouchableOpacity className="flex-row items-center p-5">
    <View className="w-8">{icon}</View>
    <Text className="flex-1 text-slate-700 dark:text-zinc-200 font-medium">{label}</Text>
    <Text className="text-blue-500 dark:text-blue-400 mr-2">{value}</Text>
    <ChevronRight size={14} color="#94a3b8" />
  </TouchableOpacity>
);
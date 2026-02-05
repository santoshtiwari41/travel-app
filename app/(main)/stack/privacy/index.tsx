import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { ShieldCheck, Fingerprint, Lock, EyeOff, ChevronRight, KeyRound } from 'lucide-react-native';

export default function PrivacySecurity() {
  const [isBiometric, setIsBiometric] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-6 pt-16">
      <Text className="text-3xl font-bold text-slate-900 dark:text-zinc-100 mb-2">Privacy</Text>
      <Text className="text-slate-500 dark:text-zinc-400 mb-8">Manage your data and security</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View className="p-5 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-500/5 mb-6 flex-row items-center">
          <View className="w-12 h-12 rounded-2xl bg-emerald-500/20 items-center justify-center">
            <ShieldCheck size={24} color="#10b981" />
          </View>
          <View className="ml-4">
            <Text className="text-emerald-700 dark:text-emerald-400 font-bold text-base">Account Protected</Text>
            <Text className="text-emerald-600/70 dark:text-emerald-500/60 text-xs">Security scan: Today 10:45 AM</Text>
          </View>
        </View>

        <Text className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3 ml-2">Update Credentials</Text>
        <View className="p-5 rounded-3xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 mb-8">
          <View className="flex-row items-center mb-4">
             <KeyRound size={20} color="#6366f1" />
             <Text className="ml-2 font-semibold text-slate-800 dark:text-zinc-200">Change Password</Text>
          </View>
          
          <View className="gap-y-3">
            <TextInput 
              secureTextEntry
              placeholder="Current Password"
              placeholderTextColor="#94a3b8"
              className="p-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/40 border border-slate-200/50 dark:border-zinc-700/30 text-slate-900 dark:text-zinc-100"
            />
            <TextInput 
              secureTextEntry
              placeholder="New Password"
              placeholderTextColor="#94a3b8"
              className="p-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/40 border border-slate-200/50 dark:border-zinc-700/30 text-slate-900 dark:text-zinc-100"
            />
            
            <TouchableOpacity className="bg-indigo-600 dark:bg-indigo-500 py-4 rounded-2xl items-center shadow-lg shadow-indigo-500/40 mt-2 active:opacity-90">
              <Text className="text-white font-bold text-base">Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3 ml-2">Advanced Security</Text>
        <View className="rounded-3xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 overflow-hidden">
          <SecurityRow 
            icon={<Fingerprint size={20} color="#6366f1" />} 
            label="Biometric Login" 
            value={isBiometric} 
            onValueChange={setIsBiometric}
            hasSwitch 
          />
          <View className="h-[1px] bg-slate-200/50 dark:bg-zinc-800/50 mx-4" />
          <SecurityRow 
            icon={<Lock size={20} color="#6366f1" />} 
            label="Two-Factor Auth" 
          />
          <View className="h-[1px] bg-slate-200/50 dark:bg-zinc-800/50 mx-4" />
          <SecurityRow 
            icon={<EyeOff size={20} color="#6366f1" />} 
            label="Private Profile" 
            value={isPrivate}
            onValueChange={setIsPrivate}
            hasSwitch 
          />
        </View>

      </ScrollView>
    </View>
  );
}

const SecurityRow = ({ icon, label, hasSwitch = false, value, onValueChange }: any) => (
  <TouchableOpacity className="flex-row items-center p-5 active:bg-slate-100/20">
    <View className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 items-center justify-center">
      {icon}
    </View>
    <Text className="flex-1 ml-4 text-slate-700 dark:text-zinc-200 font-medium text-base">{label}</Text>
    {hasSwitch ? (
      <Switch 
        trackColor={{ false: '#cbd5e1', true: '#6366f1' }} 
        thumbColor="#ffffff"
        value={value} 
        onValueChange={onValueChange}
      />
    ) : (
      <ChevronRight size={18} color="#94a3b8" />
    )}
  </TouchableOpacity>
);
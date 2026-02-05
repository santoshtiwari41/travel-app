import { View, Text, Switch } from 'react-native';
import React, { useState } from 'react';

export default function Notifications() {
  const [enabled, setEnabled] = useState(true);

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 px-6 pt-12">
      <Text className="text-3xl font-bold text-slate-900 dark:text-zinc-100 mb-8">Notifications</Text>
      
      <View className="p-4 rounded-3xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 flex-row items-center justify-between">
        <View>
          <Text className="text-slate-900 dark:text-zinc-100 font-semibold text-lg">Push Notifications</Text>
          <Text className="text-slate-500 dark:text-zinc-400">Receive alerts about activity</Text>
        </View>
        <Switch 
          value={enabled} 
          onValueChange={setEnabled}
          trackColor={{ false: '#767577', true: '#3b82f6' }}
        />
      </View>
    </View>
  );
}
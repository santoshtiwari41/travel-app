import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView
      edges={['top']}
      className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800"
    >
      <View className="flex-row items-center justify-between px-4 py-2">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-1"
            activeOpacity={0.7}
          >
            <ArrowLeft
              size={24}
              color={isDark ? '#f8fafc' : '#0f172a'}
            />
          </TouchableOpacity>

          <View>
            <Text className="text-lg font-bold text-slate-900 dark:text-white">
              Chat
            </Text>

            <View className="flex-row items-center">
              <Text className="ml-1 text-[10px] font-mono text-slate-400">
                Live
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

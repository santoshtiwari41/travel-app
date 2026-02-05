import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera, User, Mail, Briefcase, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function EditProfile() {
  const router = useRouter();
  const [image, setImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200');

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

        <View className="items-center mb-10">
          <View className="relative">
            <View className="p-1 rounded-full border-4 border-indigo-500/20">
              <Image
                source={{ uri: image }}
                className="w-32 h-32 rounded-full"
              />
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              className="absolute bottom-0 right-0 bg-indigo-600 p-3 rounded-full border-4 border-slate-50 dark:border-zinc-950 shadow-lg"
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-indigo-600 dark:text-indigo-400 font-semibold mt-4">Change Photo</Text>
        </View>

        <View className="gap-y-5">
          <GlassInput 
            label="Full Name" 
            icon={<User size={18} color="#94a3b8" />} 
            defaultValue="Alex Rivers" 
          />
          
          <GlassInput 
            label="Email Address" 
            icon={<Mail size={18} color="#94a3b8" />} 
            defaultValue="alex.rivers@design.com" 
            keyboardType="email-address"
          />

          <GlassInput 
            label="Bio" 
            icon={<Briefcase size={18} color="#94a3b8" />} 
            defaultValue="Product Designer & UI Enthusiast" 
            multiline
          />

          <TouchableOpacity 
            activeOpacity={0.9}
            className="bg-indigo-600 dark:bg-indigo-500 p-5 rounded-2xl items-center shadow-xl shadow-indigo-500/40 mt-4"
          >
            <Text className="text-white font-bold text-lg">Save Changes</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const GlassInput = ({ label, icon, ...props }: any) => (
  <View>
    <Text className="text-slate-500 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
      {label}
    </Text>
    <View className="flex-row items-center px-4 rounded-2xl border border-white/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 shadow-sm">
      <View className="mr-3">{icon}</View>
      <TextInput 
        {...props}
        className="flex-1 py-4 text-slate-900 dark:text-zinc-100 text-base"
        placeholderTextColor="#64748b"
      />
    </View>
  </View>
);
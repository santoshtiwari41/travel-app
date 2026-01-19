import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground, StatusBar, Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        
        <View className="flex-row justify-between items-center py-6">
          <View className="flex-row items-center">
            <Pressable 
              onPress={() => router.push('/(main)/stack/profile')}
              className="active:opacity-80"
            >
              <View className="p-0.5 border border-indigo-500 rounded-full">
                <Image 
                  source={{ uri: 'https://i.pravatar.cc/150?u=user1' }} 
                  className="w-12 h-12 rounded-full" 
                />
              </View>
            </Pressable>
            <View className="ml-3">
              <Text className="text-xs text-slate-500 dark:text-zinc-500 font-medium uppercase tracking-wider">Welcome back</Text>
              <Text className="text-lg font-bold text-slate-900 dark:text-white">Trip Planner</Text>
            </View>
          </View>
          
          <TouchableOpacity className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 items-center justify-center shadow-sm">
            <Feather name="search" size={20} color={isDark ? "#fff" : "#3d2c29"} />
          </TouchableOpacity>
        </View>

        <View className="mt-2 shadow-xl shadow-indigo-500/20">
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000' }}
            className="w-full h-80 rounded-[35px] overflow-hidden justify-end"
            imageStyle={{ borderRadius: 35 }}
          >
            <View className="absolute top-5 left-5 bg-indigo-600 px-4 py-1.5 rounded-full">
              <Text className="text-white text-[10px] font-black uppercase tracking-widest">Featured</Text>
            </View>
            <View className="absolute top-5 right-5 bg-white/20 border border-white/30 backdrop-blur-md flex-row items-center px-3 py-1.5 rounded-full">
              <AntDesign name="star" size={12} color="#facc15" />
              <Text className="text-white text-xs font-bold ml-1">4.9</Text>
            </View>

            <View className="m-4 p-5 bg-black/40 dark:bg-zinc-950/40 rounded-[25px] border border-white/20 backdrop-blur-lg">
              <Text className="text-white text-2xl font-black tracking-tight">Genin lake, France</Text>
              <View className="flex-row items-center mt-1">
                <Feather name="map-pin" size={12} color="#cbd5e1" />
                <Text className="text-slate-200 text-[11px] ml-1 font-medium">Ain Department, Alps</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View className="flex-row justify-between mt-8">
            <CategoryItem icon="map" label="Places" active />
            <CategoryItem icon="airplane" label="Flights" />
            <CategoryItem icon="bed" label="Hotels" />
            <CategoryItem icon="food" label="Eats" />
        </View>

        <View className="flex-row justify-between items-center mt-10 mb-5">
          <Text className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Popular destinations</Text>
          <TouchableOpacity className="bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full">
            <Text className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-1">
          <DestinationCard 
            image="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=500"
            title="Lake Como"
            location="Italy"
            rating="4.8"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1439853949127-af6478220999?q=80&w=500"
            title="Banff Park"
            location="Canada"
            rating="4.3"
          />
           <DestinationCard 
            image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500"
            title="Santorini"
            location="Greece"
            rating="4.7"
          />
        </ScrollView>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}

const CategoryItem = ({ icon, label, active = false }: any) => {
    const isDark = useColorScheme() === 'dark';
    return (
        <View className="items-center">
            <TouchableOpacity 
                className={`w-14 h-14 rounded-2xl items-center justify-center border shadow-sm ${
                    active 
                    ? 'bg-indigo-600 border-indigo-400' 
                    : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800'
                }`}
            >
                <MaterialCommunityIcons 
                    name={icon} 
                    size={24} 
                    color={active ? 'white' : (isDark ? '#71717a' : '#475569')} 
                />
            </TouchableOpacity>
            <Text className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-600'}`}>{label}</Text>
        </View>
    );
};

const DestinationCard = ({ image, title, location, rating }: any) => {
  return (
    <View className="mr-5 w-48 bg-white dark:bg-zinc-900 rounded-[30px] p-2 border border-slate-100 dark:border-zinc-800 shadow-sm">
      <ImageBackground
        source={{ uri: image }}
        className="w-full h-44 rounded-[25px] overflow-hidden"
        imageStyle={{ borderRadius: 25 }}
      >
        <View className="absolute top-3 right-3 bg-black/30 border border-white/20 backdrop-blur-md flex-row items-center px-2 py-1 rounded-full">
          <AntDesign name="star" size={10} color="#facc15" />
          <Text className="text-[10px] font-black text-white ml-1">{rating}</Text>
        </View>
      </ImageBackground>
      <View className="p-3">
        <Text className="text-slate-900 dark:text-white font-black text-base tracking-tight">{title}</Text>
        <View className="flex-row items-center mt-1">
            <Feather name="map-pin" size={10} color="#94a3b8" />
            <Text className="text-slate-400 dark:text-zinc-500 text-[10px] font-bold ml-1">{location}</Text>
        </View>
      </View>
    </View>
  );
};
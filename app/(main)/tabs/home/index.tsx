import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router=useRouter()
  return (
    <SafeAreaView className="flex-1 bg-white">
  <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5">
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center py-4">
          <Pressable onPress={() => {router.push('/(main)/stack/profile')}}>
            <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=user1' }} 
            className="w-12 h-12 rounded-full" 
          />

          </Pressable>
          
          <Text className="text-xl font-bold text-[#3d2c29]">Trip Planner</Text>
          <TouchableOpacity className="w-12 h-12 rounded-full border border-gray-100 items-center justify-center">
            <Feather name="search" size={20} color="#3d2c29" />
          </TouchableOpacity>
        </View>

        {/* Featured Card */}
        <View className="mt-4">
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000' }}
            className="w-full h-72 rounded-[30px] overflow-hidden justify-end"
            imageStyle={{ borderRadius: 30 }}
          >
            {/* Badges */}
            <View className="absolute top-4 left-4 bg-[#3d2c29]/60 px-4 py-1.5 rounded-full">
              <Text className="text-white text-xs font-bold">New for you</Text>
            </View>
            <View className="absolute top-4 right-4 bg-white/90 flex-row items-center px-2 py-1 rounded-full">
              <AntDesign name="star" size={12} color="#facc15" />
              <Text className="text-xs font-bold ml-1">4.9</Text>
            </View>

            {/* Content Overlay */}
            <View className="p-5 bg-black/20">
              <Text className="text-white text-2xl font-bold">Genin lake, France</Text>
              <Text className="text-white/80 text-xs mt-1" numberOfLines={2}>
                Lake Genin, located in the Ain department of eastern France, is a serene alpine lake surro...
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Popular Destinations Header */}
        <View className="flex-row justify-between items-center mt-8 mb-4">
          <Text className="text-xl font-bold text-[#3d2c29]">Popular destinations</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-gray-400 font-medium mr-1">View all</Text>
            <Feather name="chevron-right" size={16} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Horizontal Scroll List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <DestinationCard 
            image="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=500"
            title="Lake Como, Italy"
            desc="A famous lake in Italy, popular for its stunning..."
            rating="4.8"
          />
          <DestinationCard 
            image="https://images.unsplash.com/photo-1439853949127-af6478220999?q=80&w=500"
            title="Banff Park, Canada"
            desc="A popular tourist place in the Canada, renowned f..."
            rating="4.3"
          />
        </ScrollView>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Destination Card Component
const DestinationCard = ({ image, title, desc, rating }: any) => (
  <View className="mr-5 w-44">
    <ImageBackground
      source={{ uri: image }}
      className="w-44 h-48 rounded-[25px] overflow-hidden justify-end"
      imageStyle={{ borderRadius: 25 }}
    >
      <View className="absolute top-3 right-3 bg-white/90 flex-row items-center px-2 py-1 rounded-full">
        <AntDesign name="star" size={10} color="#facc15" />
        <Text className="text-[10px] font-bold ml-1">{rating}</Text>
      </View>
    </ImageBackground>
    <Text className="text-[#3d2c29] font-bold mt-3 text-base">{title}</Text>
    <Text className="text-gray-400 text-xs mt-1" numberOfLines={2}>{desc}</Text>
  </View>
);
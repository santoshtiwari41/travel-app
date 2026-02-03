import { View, Text, Image, TouchableOpacity } from 'react-native';

interface FriendProps {
  id: string;
  fullName: string;
  isSelf: boolean;
  isFriend: boolean;
  avatar?: string;
}

export const FriendCard = ({ friend, onPress, onAddFriend }: { 
  friend: FriendProps; 
  onPress: () => void;
  onAddFriend: () => void;
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center p-4 mb-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40"
    >
      <Image 
        source={{ uri: friend.avatar || `https://ui-avatars.com/api/?name=${friend.fullName}&background=0D8ABC&color=fff` }} 
        className="w-12 h-12 rounded-full mr-3 border border-slate-300 dark:border-zinc-700" 
      />
      
      <View className="flex-1">
        <Text className="font-bold text-base text-slate-900 dark:text-zinc-100">
          {friend.fullName} {friend.isSelf && "(You)"}
        </Text>
        <Text className="text-xs text-slate-500 dark:text-zinc-400">
          {friend.isFriend ? 'Connected' : friend.isSelf ? 'Your Profile' : 'Not connected'}
        </Text>
      </View>

      {!friend.isSelf && !friend.isFriend && (
        <TouchableOpacity 
          onPress={onAddFriend}
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-bold text-xs">Add Friend</Text>
        </TouchableOpacity>
      )}

      {friend.isFriend && (
        <View className="bg-slate-200 dark:bg-zinc-800 px-3 py-2 rounded-xl">
          <Text className="text-slate-600 dark:text-zinc-400 font-bold text-xs">Message</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
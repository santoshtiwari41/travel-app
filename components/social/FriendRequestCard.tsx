import { View, Text, Image, TouchableOpacity } from 'react-native';

interface FriendProps {
    id: string;
    senderName: string;
    senderId: string;
    senderEmail: string;
    createdAt: string;
    status: string;
    avatar?: string;
}

export const FriendRequestCard = ({ 
    friend, 
    onDelete, 
    onAcceptFriend, 
    onPress, 
    acceptPending, 
    deletingPending 
    
}: {
    friend: FriendProps;
    onDelete?: () => void;
    onAcceptFriend?: () => void;
    onPress?: () => void;
    acceptPending?: boolean;
    deletingPending?: boolean;
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center p-4 mb-3 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40"
        >
            <Image
                source={{ uri: friend.avatar || `https://ui-avatars.com/api/?name=${friend.senderName}&background=0D8ABC&color=fff` }}
                className="w-12 h-12 rounded-full mr-3 border border-slate-300 dark:border-zinc-700"
            />

            <View className="flex-1">
                <Text className="font-bold text-base text-slate-900 dark:text-zinc-100">
                    {friend.senderName}
                </Text>
            </View>

            <View className="flex-row gap-2">
                <TouchableOpacity
                    onPress={onAcceptFriend}
                    disabled={acceptPending || deletingPending}
                >
                    <View className="bg-indigo-500 px-4 py-2 rounded-xl">
                        <Text className="text-white font-bold text-sm">
                            {acceptPending ? '...' : 'Confirm'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={onDelete}
                    disabled={acceptPending || deletingPending}
                >
                    <View className="bg-red-600 px-3 py-2 rounded-xl">
                        <Text className="text-white font-bold text-sm">
                            {deletingPending ? '...' : 'Delete'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};
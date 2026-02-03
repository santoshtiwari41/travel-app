import { View, Text, FlatList } from 'react-native'
import React from 'react'
interface Message {
    id?: string;
    senderId: string;
    content: string;
    createdAt?: string;
}
const Chat = ({chat, recipientId}:{chat: Message[], recipientId: string}) => {
    return (
        <FlatList
            data={chat}
            inverted
            keyExtractor={(item, index) => item.id || index.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
            renderItem={({ item }) => {
                const isMe = item.senderId !== recipientId;
                return (
                    <View className={`mb-4 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <View className={`max-w-[80%] px-4 py-3 rounded-2xl ${isMe
                            ? 'bg-blue-600 rounded-tr-none shadow-blue-500/20 shadow-md'
                            : 'bg-white dark:bg-zinc-800 rounded-tl-none border border-slate-200 dark:border-zinc-700 shadow-sm'
                            }`}>
                            <Text className={`${isMe ? 'text-white' : 'text-slate-800 dark:text-slate-100'} text-[15px]`}>
                                {item.content}
                            </Text>
                        </View>
                    </View>
                );
            }}
        />
    )
}

export default Chat
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  useColorScheme,
  StatusBar
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { io, Socket } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '@/api/client';
import Header from '@/components/chat/Header';
import Chat from '@/components/chat/Chat';
import InputField from '@/components/chat/InputField';


interface Message {
  id?: string;
  senderId: string;
  content: string;
  createdAt?: string;
}

export default function ChatScreen() {
  const { id: recipientId } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    let isMounted = true;
    const startChat = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth-token");
        if (!token) return;

        const convRes = await apiClient.post(`/conversations`, { userId: recipientId });
        if (!isMounted) return;

        const activeConvId = convRes.data.conversationId;
        setConversationId(activeConvId);

        const historyRes = await apiClient.get(`/conversations/${activeConvId}/messages`);
        if (isMounted) setChat(Array.isArray(historyRes.data) ? historyRes.data : []);
      } catch (err) {
        console.error("Chat initialization failed:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    startChat();
    return () => { isMounted = false; };
  }, [recipientId]);

  useEffect(() => {
    if (!conversationId) return;
    let socketInstance: Socket | null = null;

    const connectSocket = async () => {
      const token = await SecureStore.getItemAsync("auth-token");
      socketInstance = io(`${process.env.EXPO_PUBLIC_API_URL}`, {
        auth: { token },
        transports: ["websocket"]
      });
      socketRef.current = socketInstance;
      socketInstance.on("connect", () => {
        setIsConnected(true);
        socketInstance?.emit("join_conversation", conversationId);
      });
      socketInstance.on("new_message", (incomingMsg: Message) => {
        setChat((prev) => [incomingMsg, ...prev]);
      });
      socketInstance.on("disconnect", () => setIsConnected(false));
    };

    connectSocket();
    return () => { socketInstance?.disconnect(); };
  }, [conversationId]);

  const handleSendMessage = () => {
    if (!message.trim() || !socketRef.current || !isConnected) return;
    socketRef.current.emit("send_message", { toUserId: recipientId, content: message });
    setMessage("");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 dark:bg-zinc-950 ">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Header />

      <Chat chat={chat} recipientId={recipientId} />
      <InputField message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} isConnected={isConnected} />  
      
    </View>
  );
}
import { View,  KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, useColorScheme } from 'react-native'
import React from 'react'
import { Send } from 'lucide-react-native'

const InputField = ({message, setMessage, handleSendMessage, isConnected}:{
    message: string;
    setMessage: (text: string) => void;
    handleSendMessage: () => void;
    isConnected: boolean;
}) => {
     const colorScheme = useColorScheme();
      const isDark = colorScheme === 'dark';
    
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View className="px-4 pt-3 pb-8 bg-white/90 dark:bg-zinc-900/90 border-t border-slate-200 dark:border-zinc-800">
          <View className="flex-row items-center bg-slate-100 dark:bg-zinc-800 rounded-2xl px-2 py-1 border border-slate-200 dark:border-zinc-700">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message..."
              placeholderTextColor={isDark ? "#71717a" : "#94a3b8"}
              style={{ maxHeight: 120 }}
              className="flex-1 dark:text-white px-3 py-3 text-[15px]"
              multiline
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!message.trim() || !isConnected}
              className={`p-3 rounded-xl ${isConnected ? 'bg-blue-600' : 'bg-slate-300 dark:bg-zinc-700'}`}
            >
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  )
}

export default InputField
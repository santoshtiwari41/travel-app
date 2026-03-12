import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, Platform,
  TouchableOpacity, ScrollView, useColorScheme, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AuthImage from '@/components/AuthImage';
import Toast from 'react-native-toast-message';
import { useMutation } from '@tanstack/react-query';
import { OTPVerify } from '@/api/auth';

export default function OTPVerifyScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const { sessionToken } = useLocalSearchParams<{ sessionToken: string }>();
  const verifyMutation = useMutation({
    mutationFn: OTPVerify,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Verified!',
        text2: 'You have Verified in successfully 👋'
      })
      router.replace('/(main)/tabs/home')
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Verificatin  Failed',
        text2: 'Please check your credentials.'
      })
    }
  })



  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length !== 0 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) return;

    setLoading(true);
    verifyMutation.mutate(({
      otp: otpString,
      token: sessionToken
    }))

  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>

          <View className="items-center justify-center mt-16 mb-4 h-64">
            <AuthImage />
          </View>

          <View className="flex-1 px-4 pb-10">
            <View className={`rounded-[40px] p-8 border shadow-2xl ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-white/20'}`}>

              <TouchableOpacity
                onPress={() => router.back()}
                className="mb-6 w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800"
              >
                <Ionicons name="arrow-back" size={20} color={isDark ? "#ffffff" : "#334155"} />
              </TouchableOpacity>

              <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Verify Email
              </Text>
              <Text className="text-slate-500 dark:text-zinc-400 mb-8 text-base">
                Enter the 6-digit code sent to your email address.
              </Text>

              <View className="flex-row justify-between mb-8">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => { inputRefs.current[index] = ref; }}
                    className={`w-[45px] h-[55px] border-2 rounded-xl text-center text-xl font-bold 
                      ${isDark ? 'bg-zinc-800/40 text-white border-zinc-700' : 'bg-white text-slate-900 border-slate-200'}
                      ${digit ? (isDark ? 'border-indigo-500' : 'border-slate-900') : ''}`}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={handleVerify}
                disabled={loading || otp.some(d => d === '')}
                className={`w-full py-5 rounded-2xl shadow-md flex-row justify-center items-center 
                  ${isDark ? 'bg-indigo-600' : 'bg-slate-900'} 
                  ${(loading || otp.some(d => d === '')) ? 'opacity-60' : 'opacity-100'}`}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg">Verify & Proceed</Text>
                )}
              </TouchableOpacity>

              <View className="mt-8 flex-row justify-center items-center">
                <Text className="text-slate-500 dark:text-zinc-400">Didn&#39;t receive a code? </Text>
                {timer > 0 ? (
                  <Text className="text-slate-900 dark:text-indigo-400 font-bold">
                    Resend in {timer}s
                  </Text>
                ) : (
                  <TouchableOpacity onPress={() => setTimer(59)}>
                    <Text className="text-indigo-600 dark:text-indigo-400 font-bold underline">
                      Resend Code
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
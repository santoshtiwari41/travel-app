import React, { useState } from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, Platform,
  LayoutAnimation, UIManager, TouchableOpacity, ScrollView, useColorScheme
} from 'react-native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthImage from '@/components/AuthImage';
import { GoogleIcon } from '@/components/google-icon';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AuthMode = 'WELCOME' | 'SIGN_UP' | 'LOGIN';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('WELCOME');
  const [email, setEmail] = useState('');
  const [fullName,setFullName]=useState('')
  const [password, setPassword] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const transitionTo = (newMode: AuthMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMode(newMode);
  };

  const handleSignin = () => {
    console.log('details are ',email,password)
  };

  const handleSignUP=()=>{
console.log('register details are ',email,password,fullName)
  }
  return (
    <View className={`flex-1 ${isDark ? 'bg-zinc-950' : 'bg-slate-50'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >

          <View className="items-center justify-center mt-16 mb-4 h-64">
            <AuthImage />
          </View>
          {mode === 'WELCOME' &&
            <View className="mx-auto mb-10">
              <Text className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                Navigate the{" "}
                <Text className="text-red-500">world</Text>
              </Text>

              <Text className="text-slate-500 dark:text-zinc-400 mt-3 text-xl font-medium">
                Let the trip planner guide you
              </Text>
            </View>
          }

          <View className="flex-1 px-4 pb-10">
            <View
              className={`rounded-[40px] p-8 border shadow-2xl 
                ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/80 border-white/20'}`}
            >
              {mode !== 'WELCOME' && (
                <TouchableOpacity
                  onPress={() => transitionTo('WELCOME')}
                  className="mb-6 w-10 h-10 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800"
                >
                  <Ionicons name="arrow-back" size={20} color={isDark ? "#ffffff" : "#334155"} />
                </TouchableOpacity>
              )}

              {mode === 'WELCOME' ? (
                <View className="pt-2">
                  <ActionButton label="Create new account" onPress={() => transitionTo('SIGN_UP')} primary />

                  <TouchableOpacity onPress={() => transitionTo('LOGIN')} className="mt-6 mb-8 items-center">
                    <Text className="text-slate-600 dark:text-zinc-400 font-semibold text-base">
                      I already have an account
                    </Text>
                  </TouchableOpacity>

                  <SocialSection />
                </View>
              ) : (
                <View>
                  {mode === 'SIGN_UP' && 
                  
                 <>
                  <InputField placeholder="Full Name" icon="person-outline" 
                  onChangeText={setFullName}
                  />
                   <InputField
                    placeholder="Email Address"
                    icon="mail-outline"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />

                  <InputField
                    placeholder="Password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    onChangeText={setPassword}
                  />
                   <View className="mt-4">
                    <ActionButton
                      label='Get Started'
                      onPress={handleSignUP}
                      primary
                    />
                  </View>
                 </>

                  }
                   {mode === 'LOGIN' &&
                   <>
                    <InputField
                    placeholder="Email Address"
                    icon="mail-outline"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />

                  <InputField
                    placeholder="Password"
                    icon="lock-closed-outline"
                    secureTextEntry
                    onChangeText={setPassword}
                  />

                  <View className="mt-4">
                    <ActionButton
                      label='Sign IN'
                      onPress={handleSignin}
                      primary
                    />
                  </View>
                   </>
                   
                   } 

                </View>
              )}

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const InputField = ({ icon, ...props }: any) => (
  <View className="flex-row items-center bg-white/50 dark:bg-zinc-800/40 border border-slate-200/60 dark:border-zinc-700/50 rounded-2xl px-4 py-4 mb-4">
    <Ionicons name={icon} size={20} color="#94a3b8" />
    <TextInput
      className="flex-1 ml-3 text-slate-900 dark:text-white text-base"
      placeholderTextColor="#94a3b8"
      {...props}
    />
  </View>
);

const ActionButton = ({ label, onPress, primary }: any) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`w-full py-5 rounded-2xl shadow-md ${primary
        ? (isDark ? 'bg-indigo-600' : 'bg-slate-900')
        : 'bg-transparent border border-slate-200 dark:border-zinc-700'
        }`}
    >
      <Text className={`text-center font-bold text-lg ${primary ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const SocialSection = ({ label = "Sign up with" }: { label?: string }) => (
  <View className="w-full">
    <View className="flex-row items-center mb-6">
      <View className="flex-1 h-[1px] bg-slate-200 dark:bg-zinc-800" />
      <Text className="mx-4 text-slate-400 font-medium">{label}</Text>
      <View className="flex-1 h-[1px] bg-slate-200 dark:bg-zinc-800" />
    </View>
    <View className="flex-row justify-center gap-6">
      <SocialIcon icon={<GoogleIcon size={24} />} /><SocialIcon
        icon={<FontAwesome5 name="facebook" size={24} color="#1877F2" />}
      />
      <SocialIcon icon={<AntDesign name="apple" size={24} color={useColorScheme() === 'dark' ? 'white' : 'black'} />} />
    </View>
  </View>
);

const SocialIcon = ({ icon }: any) => (
  <TouchableOpacity className="w-16 h-14 rounded-2xl border border-slate-200 dark:border-zinc-700 items-center justify-center bg-white/50 dark:bg-zinc-800/50 shadow-sm">
    {icon}
  </TouchableOpacity>
);
import React, { useState } from 'react';
import {
  View, Text, ImageBackground, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
  LayoutAnimation, UIManager, StyleSheet
} from 'react-native';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AuthMode = 'WELCOME' | 'SIGN_UP' | 'LOGIN';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('WELCOME');

  const transitionTo = (newMode: AuthMode) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMode(newMode);
  };
const router=useRouter()
  return (
      <View style={styles.container}>

        <ImageBackground
          source={require('../../assets/images/auth-bg.jpg')}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            {/* Main Content Container */}
            <View style={{ flex: 1 }}>

              {mode === 'WELCOME' && (
                <View className="px-8 mt-16">
                  <Text className="text-5xl font-bold text-[#3d2c29] leading-[55px]">
                    Navigate{"\n"}the world
                  </Text>
                  <Text className="text-lg text-[#3d2c29] mt-2 font-medium opacity-80">
                    Let the trip planner guide you
                  </Text>
                </View>
              )}

              <View className="flex-1 justify-end pb-8 px-4">
                <View className="bg-white/95 rounded-[40px] p-8 shadow-2xl overflow-hidden">

                  {mode !== 'WELCOME' && (
                    <TouchableOpacity
                      onPress={() => transitionTo('WELCOME')}
                      className="mb-4"
                    >
                      <Ionicons name="arrow-back" size={24} color="#3d2c29" />
                    </TouchableOpacity>
                  )}

                  {mode === 'WELCOME' ? (
                    <View className="items-center pt-2">
                      <ActionButton
                        label="Create new account"
                        onPress={() => transitionTo('SIGN_UP')}
                        primary
                      />
                      <TouchableOpacity onPress={() => transitionTo('LOGIN')} className="mt-6 mb-8">
                        <Text className="text-[#3d2c29] font-semibold text-base">I already have an account</Text>
                      </TouchableOpacity>
                      <SocialSection />
                    </View>
                  ) : (
                    <View className="pt-2">
                      <Text className="text-2xl font-bold text-[#3d2c29] mb-4">
                        {mode === 'SIGN_UP' ? 'Join the journey' : 'Welcome back'}
                      </Text>

                      {mode === 'SIGN_UP' && <InputField placeholder="Full Name" icon="person-outline" />}
                      <InputField placeholder="Email Address" icon="mail-outline" keyboardType="email-address" autoCapitalize="none" />
                      <InputField placeholder="Password" icon="lock-closed-outline" secureTextEntry />

                      <View className="mt-2">
                        <ActionButton
                          label={mode === 'SIGN_UP' ? 'Get Started' : 'Sign In'}
                          onPress={() => { router.replace('/(main)/tabs/home'); }}
                          primary
                        />
                      </View>

                      <View className="mt-6">
                        <SocialSection label="Or continue with" />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Pre-load color to avoid flicker
  }
});

// --- Keep InputField, ActionButton, SocialSection exactly as they were ---
const InputField = ({ icon, ...props }: any) => (
  <View className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 mb-3">
    <Ionicons name={icon} size={20} color="#9ca3af" />
    <TextInput className="flex-1 ml-3 text-[#3d2c29] text-base" placeholderTextColor="#9ca3af" {...props} />
  </View>
);

const ActionButton = ({ label, onPress, primary }: { label: string, onPress: () => void, primary?: boolean }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className={`w-full py-5 rounded-full ${primary ? 'bg-[#3d2c29]' : 'bg-transparent border border-[#3d2c29]'}`}
  >
    <Text className={`text-center font-bold text-lg ${primary ? 'text-white' : 'text-[#3d2c29]'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const SocialSection = ({ label = "Sign up with" }: { label?: string }) => (
  <View className="w-full items-center">
    <View className="flex-row items-center mb-6">
      <View className="flex-1 h-[1px] bg-gray-100" />
      <Text className="mx-4 text-gray-400 font-medium">{label}</Text>
      <View className="flex-1 h-[1px] bg-gray-100" />
    </View>
    <View className="flex-row justify-between w-full px-8">
      <SocialIcon icon={<AntDesign name="apple" size={24} color="black" />} />
      <SocialIcon icon={<AntDesign name="google" size={24} color="#DB4437" />} />
      <SocialIcon icon={<FontAwesome5 name="facebook" size={24} color="#1877F2" />} />
    </View>
  </View>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <TouchableOpacity className="w-14 h-14 rounded-full border border-gray-100 items-center justify-center bg-white shadow-sm">
    {icon}
  </TouchableOpacity>
);
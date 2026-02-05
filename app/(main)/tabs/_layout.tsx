import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useColorScheme, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const safePaddingBottom = Platform.OS === 'ios' 
    ? Math.max(insets.bottom, 20) 
    : (insets.bottom > 0 ? insets.bottom + 10 : 25);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? '#818cf8' : '#0f172a',
        tabBarInactiveTintColor: isDark ? '#52525b' : '#94a3b8',
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          
          height: Platform.OS === 'ios' ? 92 : 108, 
          backgroundColor: isDark ? '#18181b' : '#ffffff',
          
          borderTopWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          
          elevation: 0,
          shadowOpacity: 0,

          paddingBottom: safePaddingBottom,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 0, 
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="trips/index"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="map" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          title: 'NOtification',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bell" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="community/index"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="users" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const TabIcon = ({ name, color, focused }: { name: any, color: string, focused: boolean }) => {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      height: 38, 
      borderRadius: 10,
      backgroundColor: focused ? (color + '15') : 'transparent',
    }}>
      <Feather name={name} size={28} color={color} />
    </View>
  );
};
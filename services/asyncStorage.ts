import AsyncStorage from "@react-native-async-storage/async-storage";


export const setPushToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('expo-Push-Token', value);
  } catch (e) {
    console.log('Failed to store the push token:', e);
  }
};

export const getPushToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('expo-Push-Token');
    return token;
  } catch (e) {
    console.log('Failed to retrieve the push token:', e);
    return null;
  }
};

export const removePushToken = async () => {
  try {
    await AsyncStorage.removeItem('expo-Push-Token');
  } catch (e) {
    console.log('Failed to remove the push token:', e);
  }
};



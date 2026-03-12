import { socket } from "./client";
import * as SecureStore from 'expo-secure-store';

export const connectSocket = async() => {
          const token = await SecureStore.getItemAsync('auth-token');
    
  socket.auth = { token };
  socket.connect();
};

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { io } from "socket.io-client";

export const apiClient = axios.create({
  baseURL: 'http://192.168.0.12:8000/api/v1',
  timeout: 10000,
});
export const socketClient=

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('auth-token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } 
      
    } catch (error) {
      console.error("Error fetching token", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const socket = io("http://192.168.0.12:3000/api/v1", {
  transports: ["websocket"], 
  autoConnect: false,
});

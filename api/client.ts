import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  baseURL: 'http://192.168.0.11:8080/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('userToken');

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
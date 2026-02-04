import { apiClient } from "./client";

export const fetchCities = async (query: string) => {
  if (!query || query.trim().length < 2) return [];
  
  try {
    const res = await apiClient.get('/place/city', {
      params: { search: query }
    });

    return res.data?.data || []; 
  } catch (error) {
    throw error;
  }
};
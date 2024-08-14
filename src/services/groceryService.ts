import { GroceryItem } from '@/types';
import { axiosInstance } from '@/utils';

export const fetchGroceryItems = async (): Promise<GroceryItem[]> => {
  const response = await axiosInstance.get<GroceryItem[]>('/groceryItems');
  return response.data;
};

export const fetchGroceryItemById = async (id: string): Promise<GroceryItem> => {
  const response = await axiosInstance.get<GroceryItem>(`/groceryItems/${id}`);
  return response.data;
};

export const addGroceryItem = async (item: Omit<GroceryItem, 'id'>): Promise<GroceryItem> => {
  const response = await axiosInstance.post<GroceryItem>('/groceryItems', item);
  return response.data;
};

export const updateGroceryPartialById = async (
  id: string,
  partial: Partial<GroceryItem>,
): Promise<GroceryItem> => {
  const response = await axiosInstance.patch<GroceryItem>(`/groceryItems/${id}`, partial);
  return response.data;
};

export const updateGroceryItem = async (item: GroceryItem): Promise<GroceryItem> => {
  const response = await axiosInstance.put<GroceryItem>(`/groceryItems/${item.id}`, item);
  return response.data;
};

export const deleteGroceryItem = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/groceryItems/${id}`);
};

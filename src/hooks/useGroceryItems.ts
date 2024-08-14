import {
  addGroceryItem,
  deleteGroceryItem,
  fetchGroceryItems,
  updateGroceryItem,
  updateGroceryPartialById,
} from '@/services';
import { GroceryItem } from '@/types';
import { useEffect, useState } from 'react';

export const useGroceryItems = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const response = await fetchGroceryItems();
      setGroceryItems(response);
    } catch (err) {
      setError('Failed to fetch grocery items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<GroceryItem, 'id'>) => {
    try {
      setLoading(true);
      const response = await addGroceryItem(item);
      setGroceryItems((prevItems) => [...prevItems, response]);
      return response;
    } catch (err) {
      setError('Failed to add grocery item');
    } finally {
      setLoading(false);
    }
  };

  const updatePartialById = async (id: string, partial: Partial<GroceryItem>) => {
    try {
      setLoading(true);
      const response = await updateGroceryPartialById(id, partial);
      setGroceryItems((prevItems) => prevItems.map((i) => (i.id === id ? response : i)));
      return response;
    } catch (err) {
      setError('Failed to update grocery item');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item: GroceryItem) => {
    try {
      setLoading(true);
      const response = await updateGroceryItem(item);
      setGroceryItems((prevItems) => prevItems.map((i) => (i.id === item.id ? response : i)));
      return response;
    } catch (err) {
      setError('Failed to update grocery item');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      await deleteGroceryItem(id);
      setGroceryItems((prevItems) => prevItems.filter((i) => i.id !== id));
    } catch (err) {
      setError('Failed to delete grocery item');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    groceryItems,
    loading,
    error,
    addItem,
    updatePartialById,
    updateItem,
    deleteItem,
  };
};

import { useGroceryItems } from '@/hooks';
import { GroceryItem } from '@/types';
import { createContext, ReactNode, useContext } from 'react';

type GroceryItemsContextType = {
  groceryItems: GroceryItem[];
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<GroceryItem, 'id'>) => Promise<GroceryItem | undefined>;
  updatePartialById: (
    id: string,
    partial: Partial<GroceryItem>,
  ) => Promise<GroceryItem | undefined>;
  updateItem: (item: GroceryItem) => Promise<GroceryItem | undefined>;
  deleteItem: (id: string) => Promise<void>;
};

const GroceryItemsContext = createContext<GroceryItemsContextType | undefined>(undefined);

export const GroceryItemsProvider = ({ children }: { children: ReactNode }) => {
  const groceryItemsHook = useGroceryItems();

  return (
    <GroceryItemsContext.Provider value={groceryItemsHook}>{children}</GroceryItemsContext.Provider>
  );
};

export const useGroceryItemsContext = (): GroceryItemsContextType => {
  const context = useContext(GroceryItemsContext);
  if (context === undefined) {
    throw new Error('useGroceryItemsContext must be used within a GroceryItemsProvider');
  }
  return context;
};

'use client';

import { GroceryItemsProvider } from './grocery-items';

export type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <GroceryItemsProvider>{children}</GroceryItemsProvider>;
}

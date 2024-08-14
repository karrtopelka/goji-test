import { fetchGroceryItems } from '@/services';
import { useQuery } from 'react-query';

export const useGroceryItems = () => {
  return useQuery(['groceryItems'], {
    queryFn: () => fetchGroceryItems(),
  });
};

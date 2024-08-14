import { fetchGroceryItemById } from '@/services';
import { useQuery } from 'react-query';

export const useGroceryItem = ({ id }: { id: string | undefined }) => {
  return useQuery({
    queryKey: ['groceryItem', id],
    queryFn: async () => fetchGroceryItemById(id!),
    enabled: !!id,
  });
};

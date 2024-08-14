import { updateGroceryPartialById } from '@/services';
import { GroceryItem } from '@/types';
import { queryClient } from '@/utils';
import { useMutation } from 'react-query';

export const useUpdatePartialByIdGroceryItem = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<GroceryItem> }) =>
      updateGroceryPartialById(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('groceryItems');
      queryClient.invalidateQueries(['groceryItem', data.id]);
    },
  });
};

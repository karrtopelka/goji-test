import { addGroceryItem } from '@/services';
import { GroceryItem } from '@/types';
import { queryClient } from '@/utils';
import { useMutation } from 'react-query';

export const useAddGroceryItem = () => {
  return useMutation({
    mutationFn: async (data: Omit<GroceryItem, 'id'>) => addGroceryItem(data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries('groceryItems');
    },
  });
};

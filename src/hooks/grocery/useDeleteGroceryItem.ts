// write a react-query mutation hook that will delete a grocery item
// the hook should be named useDeleteGroceryItem
// the hook should accept an object with an id property

import { deleteGroceryItem } from '@/services';
import { queryClient } from '@/utils';
import { useMutation } from 'react-query';

export const useDeleteGroceryItem = () => {
  return useMutation({
    mutationFn: async (id: string) => deleteGroceryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries('groceryItems');
    },
  });
};

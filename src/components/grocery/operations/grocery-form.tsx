'use client';

import { useAddGroceryItem, useToast, useUpdatePartialByIdGroceryItem } from '@/hooks';
import { GroceryItem, grocerySchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormHelperText, FormLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type BaseProps = {
  showReset?: boolean;
  onClose?: () => void;
  onDelete?: (id: string) => Promise<void>;
};

type WithItem = {
  item: GroceryItem;
  onDelete: (id: string) => Promise<void>;
};

type WithoutItem = {
  item?: GroceryItem;
  onDelete?: never;
};

export type GroceryFormProps = BaseProps & (WithItem | WithoutItem);

export const GroceryForm = ({ item, onDelete, showReset, onClose }: GroceryFormProps) => {
  const { mutateAsync: updatePartial } = useUpdatePartialByIdGroceryItem();
  const { mutateAsync: addItem } = useAddGroceryItem();

  const { showToast, ToastComponent } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof grocerySchema>>({
    resolver: zodResolver(grocerySchema),
    defaultValues: item || {
      count: 1,
      bought: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof grocerySchema>) => {
    try {
      if (item) {
        const response = await updatePartial({ id: item.id, data });
        showToast(`Grocery item ${response?.name} updated successfully`, 'success');
      } else {
        const response = await addItem(data);
        showToast(`Grocery item ${response?.name} added successfully`, 'success');
      }
      reset();
      onClose?.();
    } catch (error) {
      showToast('Error adding grocery item', 'error');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label='Name'
        {...register('name')}
        required
        fullWidth
        margin='normal'
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />
      <TextField
        label='Count'
        {...register('count', {
          valueAsNumber: true,
          validate: (value) => !isNaN(value) || 'Count must be a valid number',
        })}
        type='number'
        required
        fullWidth
        margin='normal'
        defaultValue={1}
        error={!!errors.count}
        helperText={errors.count ? errors.count.message : ''}
      />
      <Box>
        <Checkbox {...register('bought')} />
        <FormLabel>Bought</FormLabel>
        {errors.bought && <FormHelperText error>{errors.bought.message}</FormHelperText>}
      </Box>
      <Box display='flex' justifyContent='space-between' mt={2}>
        {onDelete && (
          <Button type='button' color='error' variant='outlined' onClick={() => onDelete(item.id)}>
            Delete
          </Button>
        )}
        <Box display='flex' justifyContent='flex-end'>
          {showReset && (
            <Button type='button' variant='outlined' onClick={() => reset()} sx={{ mr: 2 }}>
              Reset
            </Button>
          )}
          <Button type='submit' variant='contained' size='large'>
            Submit
          </Button>
        </Box>
      </Box>
      <ToastComponent />
    </form>
  );
};

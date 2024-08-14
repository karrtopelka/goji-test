import { z } from 'zod';

export const grocerySchema = z.object({
  name: z
    .string()
    .nonempty('Grocery item name is required')
    .min(3, 'Grocery item name must be at least 3 characters long'),
  count: z.number().min(1, 'Count should be at least 1').default(1),
  bought: z.boolean().default(false),
});

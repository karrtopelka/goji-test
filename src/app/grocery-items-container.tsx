'use client';

import { KonvaWrapper, StickerLayer } from '@/components';
import { useGroceryItemsContext } from '@/contexts';
import Box from '@mui/material/Box';
import { useRef } from 'react';

export const GroceryItemsContainer = () => {
  const { groceryItems } = useGroceryItemsContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
      ref={wrapperRef}>
      <KonvaWrapper wrapperRef={wrapperRef}>
        <StickerLayer items={groceryItems} dimensions={{ width: 0, height: 0 }} />
      </KonvaWrapper>
    </Box>
  );
};

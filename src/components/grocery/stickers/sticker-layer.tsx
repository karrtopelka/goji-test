'use client';

import { GroceryItem } from '@/types';
import { useEffect, useState } from 'react';
import { Layer } from 'react-konva';
import { StickerText } from './sticker-text';

export type Sticker<T> = {
  item: T;
  x: number;
  y: number;
};

export type StickerLayerProps = Readonly<{
  items: GroceryItem[];
  dimensions: { width: number; height: number };
}>;

export const StickerLayer = ({ items, dimensions }: StickerLayerProps) => {
  const [stickers, setStickers] = useState<Sticker<GroceryItem>[]>([]);

  useEffect(() => {
    const width = dimensions.width ?? 0;
    const height = dimensions.height ?? 0;

    setStickers(
      items.map((item) => ({
        item,
        x: item.stickerPosition?.x ?? Math.random() * (width - 100),
        y: item.stickerPosition?.y ?? Math.random() * (height - 100),
      })),
    );
  }, [items, dimensions]);

  return (
    <Layer>
      {stickers.map((sticker) => (
        <StickerText
          key={sticker.item.id}
          id={sticker.item.id}
          text={`${sticker.item.name} | ${sticker.item.count}`}
          x={sticker.x}
          y={sticker.y}
          wrapperWidth={dimensions.width ?? 0}
          wrapperHeight={dimensions.height ?? 0}
          rectConfig={{
            fill: sticker.item.bought ? 'lightgrey' : 'yellow',
          }}
          textConfig={{
            fill: sticker.item.bought ? 'grey' : 'black',
            textDecoration: sticker.item.bought ? 'line-through' : 'none',
          }}
        />
      ))}
    </Layer>
  );
};

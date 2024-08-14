export type StickerPosition = {
  x: number;
  y: number;
};

export type GroceryItem = {
  id: string;
  name: string;
  count: number;
  bought: boolean;
  stickerPosition?: StickerPosition;
};

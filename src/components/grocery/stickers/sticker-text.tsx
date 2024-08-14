'use client';

import { useGroceryItemsContext } from '@/contexts';
import { ShapeConfig } from 'konva/lib/Shape';
import { TextConfig } from 'konva/lib/shapes/Text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';

const PADDING = 20;

export type StickerTextProps = Readonly<{
  text: string;
  x: number;
  y: number;
  wrapperWidth: number;
  wrapperHeight: number;
  rectConfig?: ShapeConfig;
  textConfig?: TextConfig;
  id: string;
}>;

export const StickerText = ({
  text,
  x,
  y,
  wrapperWidth,
  wrapperHeight,
  id,
  ...rest
}: StickerTextProps) => {
  const { updatePartialById } = useGroceryItemsContext();
  const [initialRotation, setInitialRotation] = useState(0);
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [shadowBlur, setShadowBlur] = useState(10);
  const [isActive, setIsActive] = useState(false);

  const textRef = useRef<any>(null);
  const groupRef = useRef<any>(null);

  const handleDragBoundFunc = useCallback(
    (pos: { x: number; y: number }) => {
      const stickerWidth = textSize.width + PADDING * 2;
      const stickerHeight = textSize.height + PADDING * 2;

      const angle = (rotation * Math.PI) / 180;

      const rotatedWidth =
        Math.abs(stickerWidth * Math.cos(angle)) + Math.abs(stickerHeight * Math.sin(angle));
      const rotatedHeight =
        Math.abs(stickerHeight * Math.cos(angle)) + Math.abs(stickerWidth * Math.sin(angle));

      const newX = Math.max(0, Math.min(pos.x, wrapperWidth - rotatedWidth));
      const newY = Math.max(0, Math.min(pos.y, wrapperHeight - rotatedHeight));

      return { x: newX, y: newY };
    },
    [rotation, textSize, wrapperWidth, wrapperHeight],
  );

  useEffect(() => {
    if (textRef.current) {
      const width = textRef.current.width();
      const height = textRef.current.height();
      setTextSize({ width, height });

      // Set a random rotation between -15 and 15 degrees
      const initialRotation = Math.random() * 30 - 15;
      setRotation(initialRotation);
      setInitialRotation(initialRotation);
    }
  }, [text]);

  useEffect(() => {
    if (groupRef.current) {
      const { x, y } = groupRef.current.position();
      const newPos = handleDragBoundFunc({ x, y });
      groupRef.current.position(newPos);
    }
  }, [wrapperWidth, wrapperHeight, handleDragBoundFunc]);

  return (
    <Group
      ref={groupRef}
      draggable
      x={x}
      y={y}
      rotation={rotation}
      scaleX={scale}
      scaleY={scale}
      shadowBlur={shadowBlur}
      dragBoundFunc={handleDragBoundFunc}
      onDragStart={() => {
        setRotation(0);
        setScale(1.2);
        setShadowBlur(20);
      }}
      onDragEnd={(e) => {
        console.log(e);
        setRotation(initialRotation);
        setScale(1);
        setShadowBlur(10);
        const { x, y } = e.target.position();
        updatePartialById(id, { stickerPosition: { x, y } });
      }}
      onMouseEnter={() => {
        setScale(1.02);
        setShadowBlur(15);
      }}
      onMouseLeave={() => {
        setScale(1);
        setShadowBlur(10);
      }}
      onDblClick={() => {
        setIsActive((prev) => !prev);
      }}>
      <Rect
        width={textSize.width + PADDING * 2}
        height={textSize.height + PADDING * 2}
        cornerRadius={20}
        shadowOffset={{ x: 5, y: 5 }}
        shadowColor='black'
        {...rest.rectConfig}
      />
      <Text
        ref={textRef}
        x={PADDING}
        y={PADDING}
        text={text}
        fontSize={24}
        fill='black'
        {...rest.textConfig}
      />
    </Group>
  );
};

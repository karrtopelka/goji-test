'use client';

import { Children, cloneElement, isValidElement, RefObject, useEffect, useState } from 'react';
import { Stage } from 'react-konva';

export type KonvaWrapperProps = Readonly<{
  wrapperRef: RefObject<HTMLDivElement> | null;
  children: React.ReactNode;
}>;

export type KonvaLayerProps = Readonly<{
  dimensions: { width: number; height: number };
}>;

export const KonvaWrapper = ({ wrapperRef, children }: KonvaWrapperProps) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (wrapperRef && wrapperRef.current?.offsetHeight && wrapperRef.current?.offsetWidth) {
      setDimensions({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      });
    }
  }, [wrapperRef]);

  return (
    <Stage width={dimensions.width} height={dimensions.height}>
      {Children.map(children, (child) =>
        isValidElement<KonvaLayerProps>(child) ? cloneElement(child, { dimensions }) : child,
      )}
    </Stage>
  );
};

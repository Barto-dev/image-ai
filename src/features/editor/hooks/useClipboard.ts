import { fabric } from 'fabric';
import { useCallback, useRef } from 'react';

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<fabric.Object | null>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: fabric.Object) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) {
      return;
    }
    clipboard.current.clone((clonedObj: fabric.Object) => {
      canvas?.discardActiveObject();
      clonedObj.set({
        left: Number(clonedObj.left) + 10,
        top: Number(clonedObj.top) + 10,
        evented: true,
      });
      if (clonedObj.type === 'activeSelection' && canvas) {
        clonedObj.canvas = canvas;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        clonedObj.forEachObject((obj: fabric.Object) => {
          canvas.add(obj);
        });
        clonedObj.setCoords();
      } else {
        canvas?.add(clonedObj);
      }

      if (clipboard.current?.top && clipboard.current?.left) {
        clipboard.current.top += 10;
        clipboard.current.left += 10;
      }
      canvas?.setActiveObject(clonedObj);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};

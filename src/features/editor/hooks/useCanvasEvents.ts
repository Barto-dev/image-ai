import { fabric } from 'fabric';
import { useEffect } from 'react';

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;

    canvas.on('selection:created', (e) => {
      setSelectedObjects(e.selected || []);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObjects(e.selected || []);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObjects([]);
    });

    return () => {
      canvas.off('selection:created');
      canvas.off('selection:updated');
      canvas.off('selection:cleared');
    };
  }, [canvas]);
};

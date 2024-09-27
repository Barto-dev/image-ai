import { fabric } from 'fabric';
import { useEffect } from 'react';

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
  saveHistory: () => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
  saveHistory,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;

    canvas.on('object:added', () => {
      saveHistory();
    });

    canvas.on('object:modified', () => {
      saveHistory();
    });

    canvas.on('object:removed', () => {
      saveHistory();
    });

    canvas.on('selection:created', (e) => {
      setSelectedObjects(e.selected || []);
    });

    canvas.on('selection:updated', (e) => {
      setSelectedObjects(e.selected || []);
    });

    canvas.on('selection:cleared', () => {
      setSelectedObjects([]);
      clearSelectionCallback?.();
    });

    return () => {
      canvas.off('object:added');
      canvas.off('object:modified');
      canvas.off('object:removed');
      canvas.off('selection:created');
      canvas.off('selection:updated');
      canvas.off('selection:cleared');
    };
  }, [canvas, clearSelectionCallback, setSelectedObjects, saveHistory]);
};

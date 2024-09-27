import { useCallback, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { HISTORY_JSON_KEYS } from '@/features/editor/constants';

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}

export const useHistory = ({ canvas }: UseHistoryProps) => {
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const saveHistory = useCallback(
    (skip = false) => {
      if (!canvas) return;

      const currentState = canvas.toJSON(HISTORY_JSON_KEYS);
      const jsonString = JSON.stringify(currentState);

      if (!skip && !skipSave.current) {
        canvasHistory.current.push(jsonString);
        setHistoryIndex(canvasHistory.current.length - 1);
      }

      // TODO:save callback
    },
    [canvas],
  );

  const undo = useCallback(() => {
    if (canUndo() && canvas) {
      skipSave.current = true;
      canvas.clear().renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);
      canvas.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        skipSave.current = false;
      });
    }
  }, [canUndo, historyIndex, canvas]);

  const redo = useCallback(() => {
    if (canRedo() && canvas) {
      skipSave.current = true;
      canvas.clear().renderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);
      canvas.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canRedo, historyIndex, canvas]);

  return {
    saveHistory,
    canRedo,
    canUndo,
    setHistoryIndex,
    canvasHistory,
    undo,
    redo,
  };
};

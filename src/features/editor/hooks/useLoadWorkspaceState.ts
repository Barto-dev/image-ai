import { fabric } from 'fabric';
import { MutableRefObject, useEffect, useRef } from 'react';
import { HISTORY_JSON_KEYS } from '@/features/editor/constants';

interface UseLoadWorkspaceStateProps {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: MutableRefObject<string | undefined>;
  canvasHistory: MutableRefObject<string[]>;
  setHistoryIndex: (index: number) => void;
}

export const useLoadWorkspaceState = ({
  autoZoom,
  canvas,
  canvasHistory,
  initialState,
  setHistoryIndex,
}: UseLoadWorkspaceStateProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && initialState?.current && canvas) {
      const initialStateJson = JSON.parse(initialState.current);
      canvas.loadFromJSON(initialStateJson, () => {
        const currentState = JSON.stringify(canvas.toJSON(HISTORY_JSON_KEYS));
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
      initialized.current = true;
    }
  }, [
    autoZoom,
    canvas,
    canvasHistory, // ref
    initialState, // ref
    setHistoryIndex, // setState
  ]);
};

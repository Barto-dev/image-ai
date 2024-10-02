import { fabric } from 'fabric';
import { useHotkeys } from 'react-hotkeys-hook';
import { BuildEditor } from '@/features/editor/types';

interface UseHotkeysProps {
  canvas: fabric.Canvas | null;
  saveHistory: (skip?: boolean) => void;
  editor: ReturnType<BuildEditor> | undefined;
  undo: () => void;
  redo: () => void;
  copy: () => void;
  paste: () => void;
}

export const useEditorHotkeys = ({
  canvas,
  editor,
  saveHistory,
  copy,
  paste,
  undo,
  redo,
}: UseHotkeysProps) => {
  const selectAllObjects = () => {
    canvas?.discardActiveObject();
    const allObjects = canvas?.getObjects().filter((obj) => obj.selectable);
    canvas?.setActiveObject(
      new fabric.ActiveSelection(allObjects || [], { canvas }),
    );
    canvas?.renderAll();
  };

  useHotkeys('backspace', () => {
    editor?.deleteActiveObject();
  });

  useHotkeys('mod+z', () => {
    undo();
  });

  useHotkeys('mod+y', () => {
    redo();
  });

  useHotkeys('mod+c', () => {
    copy();
  });

  useHotkeys('mod+v', () => {
    paste();
  });

  useHotkeys('mod+s', (keyboardEvent) => {
    keyboardEvent.preventDefault();
    saveHistory(true);
  });

  useHotkeys('mod+a', selectAllObjects);
};

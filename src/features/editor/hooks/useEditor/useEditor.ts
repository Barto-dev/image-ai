import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

import { useAutoResize } from '../useAutoResize';
import { UseEditorProps } from '../../types';
import {
  DEFAULT_OPACITY,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  WORKSPACE_NAME,
} from '../../constants';
import { useCanvasEvents } from '../useCanvasEvents';
import { buildEditor } from './buildEditor';

type InitArgs = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

export const useEditor = ({ clearSelectionCallback }: UseEditorProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);

  useAutoResize({ canvas, container });
  useCanvasEvents({ canvas, setSelectedObjects, clearSelectionCallback });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        strokeDashArray,
        setStrokeDashArray,
        setStrokeWidth,
        opacity,
        setOpacity,
        selectedObjects,
      });
    }
    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    opacity,
  ]);

  const init = useCallback(({ initialCanvas, initialContainer }: InitArgs) => {
    fabric.Object.prototype.set({
      cornerColor: 'white',
      cornerStyle: 'circle',
      borderColor: '#3b82f6',
      borderScaleFactor: 1.5,
      transparentCorners: false,
      borderOpacityWhenMoving: 1,
      cornerStrokeColor: '#3b82f6',
    });

    const initialWorkspace = new fabric.Rect({
      width: 900,
      height: 1200,
      name: WORKSPACE_NAME,
      fill: 'white',
      selectable: false,
      hasControls: false,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.8)',
        blur: 5,
      }),
    });
    initialCanvas.setWidth(initialContainer.offsetWidth);
    initialCanvas.setHeight(initialContainer.offsetHeight);
    initialCanvas.add(initialWorkspace);
    initialCanvas.centerObject(initialWorkspace);
    initialCanvas.clipPath = initialWorkspace;
    setCanvas(initialCanvas);
    setContainer(initialContainer);
  }, []);
  return {
    init,
    editor,
  };
};

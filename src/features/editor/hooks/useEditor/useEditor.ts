import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

import { useAutoResize } from '../useAutoResize';
import { FontStyle, TextAlign, UseEditorProps } from '../../types';
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_LINETHROUGH,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_STYLE,
  DEFAULT_FONT_UNDERLINE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_OPACITY,
  DEFAULT_TEXT_ALIGN,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  WORKSPACE_NAME,
} from '../../constants';
import { useCanvasEvents } from '../useCanvasEvents';
import { buildEditor } from './buildEditor';
import { useClipboard } from '../useClipboard';

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
  const [fontFamily, setFontFamily] = useState(DEFAULT_FONT_FAMILY);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontWeight, setFontWeight] = useState(DEFAULT_FONT_WEIGHT);
  const [fontStyle, setFontStyle] = useState<FontStyle>(DEFAULT_FONT_STYLE);
  const [fontLinethrough, setFontLinethrough] = useState(
    DEFAULT_FONT_LINETHROUGH,
  );
  const [fontUnderline, setFontUnderline] = useState(DEFAULT_FONT_UNDERLINE);
  const [textAlign, setTextAlign] = useState<TextAlign>(DEFAULT_TEXT_ALIGN);

  const { copy, paste } = useClipboard({ canvas });
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
        fontFamily,
        setFontFamily,
        fontWeight,
        setFontWeight,
        fontStyle,
        setFontStyle,
        fontLinethrough,
        setFontLinethrough,
        fontUnderline,
        setFontUnderline,
        textAlign,
        setTextAlign,
        fontSize,
        setFontSize,
        copy,
        paste,
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
    fontFamily,
    fontWeight,
    fontStyle,
    fontUnderline,
    fontLinethrough,
    textAlign,
    fontSize,
    copy,
    paste,
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

import { fabric } from 'fabric';
import { ITextboxOptions } from 'fabric/fabric-impl';

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates';

type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  setFillColor: (color: string) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  strokeDashArray: number[];
  setStrokeDashArray: (dashArray: number[]) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  fontFamily: string;
  setFontFamily: (fontFamily: string) => void;
  selectedObjects: fabric.Object[];
};

export type BuildEditor = (props: BuildEditorProps) => {
  bringForward: () => void;
  sendBackwards: () => void;
  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;
  changeStrokeDashArray: (dashArray: number[]) => void;
  changeOpacity: (opacity: number) => void;
  changeFontFamily: (fontFamily: string) => void;
  addCircle: () => void;
  addSofRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
};

export type UseEditorProps = {
  clearSelectionCallback?: () => void;
};

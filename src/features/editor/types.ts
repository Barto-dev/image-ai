import { fabric } from 'fabric';
import { ITextboxOptions } from 'fabric/fabric-impl';

export type FontStyle = ITextboxOptions['fontStyle'];

export type TextAlign = 'left' | 'center' | 'right';

export type SaveCallback = (values: {
  json: string;
  height: number;
  width: number;
}) => void;

export type FilterType =
  | 'polaroid'
  | 'sepia'
  | 'kodachrome'
  | 'contrast'
  | 'brightness'
  | 'brownie'
  | 'vintage'
  | 'technicolor'
  | 'pixelate'
  | 'invert'
  | 'blur'
  | 'sharpen'
  | 'emboss'
  | 'removecolor'
  | 'blacknwhite'
  | 'vibrance'
  | 'blendcolor'
  | 'huerotate'
  | 'grayscale'
  | 'saturation'
  | 'resize'
  | 'default'
  | 'gamma';

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
  fontWeight: number;
  setFontWeight: (fontWeight: number) => void;
  fontStyle: FontStyle;
  setFontStyle: (fontStyle: FontStyle) => void;
  fontLinethrough: boolean;
  setFontLinethrough: (linethrough: boolean) => void;
  fontUnderline: boolean;
  setFontUnderline: (underline: boolean) => void;
  textAlign: TextAlign;
  setTextAlign: (textAlign: TextAlign) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  copy: () => void;
  paste: () => void;
  selectedObjects: fabric.Object[];
  autoZoom: () => void;
  saveHistory: (skip?: boolean) => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
  redo: () => void;
  undo: () => void;
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
  changeFontWeight: (fontWeight: number) => void;
  changeFontStyle: (fontStyle: FontStyle) => void;
  changeFontLinethrough: (linethrough: boolean) => void;
  changeFontUnderline: (underline: boolean) => void;
  changeTextAlign: (textAlign: TextAlign) => void;
  changeFontSize: (fontSize: number) => void;
  changeImageFilter: (filter: FilterType) => void;
  changeWorkspaceSize: (size: { width: number; height: number }) => void;
  changeWorkspaceBackground: (color: string) => void;
  addCircle: () => void;
  addSofRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  addImage: (url: string) => void;
  deleteActiveObject: () => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => FontStyle;
  getActiveFontLinethrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveTextAlign: () => TextAlign;
  getActiveFontSize: () => number;
  getWorkspace: () => fabric.Object | undefined;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  copy: () => void;
  paste: () => void;
  autoZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  savePng: () => void;
  saveJpg: () => void;
  saveSvg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
};

export type UseEditorProps = {
  defaultState?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  clearSelectionCallback?: () => void;
  saveCallback?: SaveCallback;
};

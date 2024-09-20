import { BuildEditor } from '@/features/editor/types';
import { fabric } from 'fabric';
import { isFabricTextType } from '@/features/editor/utils';
import {
  CIRCLE_OPTIONS,
  DEFAULT_OPACITY,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXTBOX_OPTIONS,
  TRIANGLE_OPTIONS,
  WORKSPACE_NAME,
} from '@/features/editor/constants';

const getActiveProperty = <T>(
  property: keyof fabric.Object,
  defaultValue: T,
  selectedObjects: fabric.Object[],
): T => {
  const selectedObject = selectedObjects[0];
  if (!selectedObject) {
    return defaultValue;
  }
  return (selectedObject.get(property) as T) || defaultValue;
};

export const buildEditor: BuildEditor = ({
  canvas,
  fillColor,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  strokeDashArray,
  setStrokeDashArray,
  setOpacity,
  selectedObjects,
}) => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === WORKSPACE_NAME);
  };

  const addToCanvas = (object: fabric.Object) => {
    canvas.viewportCenterObject(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  const getActiveFillColor = () =>
    getActiveProperty('fill', fillColor, selectedObjects);

  const getActiveStrokeColor = () =>
    getActiveProperty('stroke', strokeColor, selectedObjects);

  const getActiveStrokeWidth = () =>
    getActiveProperty('strokeWidth', strokeWidth, selectedObjects);

  const getActiveStrokeDashArray = () =>
    getActiveProperty('strokeDashArray', strokeDashArray, selectedObjects);

  // for new objects, opacity is always 1 instead of previous object's opacity
  const getActiveOpacity = () =>
    getActiveProperty('opacity', DEFAULT_OPACITY, selectedObjects);

  return {
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object);
      });
      canvas.renderAll();
    },

    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object);
      });
      canvas.renderAll();

      // to prevent shapes from being moved behind the workspace
      const workspace = getWorkspace();
      workspace?.sendToBack();
    },

    changeFillColor: (color: string) => {
      setFillColor(color);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: color });
      });
      canvas.renderAll();
    },

    changeStrokeColor: (color: string) => {
      setStrokeColor(color);
      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke property
        if (isFabricTextType(object.type)) {
          object.set({ fill: color });
          return;
        }
        object.set({ stroke: color });
      });
      canvas.renderAll();
    },

    changeStrokeWidth: (width: number) => {
      setStrokeWidth(width);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: width });
      });
      canvas.renderAll();
    },

    changeStrokeDashArray: (dashArray: number[]) => {
      setStrokeDashArray(dashArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: dashArray });
      });
      canvas.renderAll();
    },

    changeOpacity: (opacity: number) => {
      setOpacity(opacity);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity });
      });
      canvas.renderAll();
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        fill: fillColor || FILL_COLOR,
        ...TEXTBOX_OPTIONS,
        ...options,
      });
      addToCanvas(object);
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor || FILL_COLOR,
        stroke: strokeColor || STROKE_COLOR,
        strokeWidth: strokeWidth || STROKE_WIDTH,
        strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
      });
      addToCanvas(object);
    },

    addSofRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor || FILL_COLOR,
        stroke: strokeColor || STROKE_COLOR,
        strokeWidth: strokeWidth || STROKE_WIDTH,
        strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
        rx: 20,
        ry: 20,
      });
      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor || FILL_COLOR,
        stroke: strokeColor || STROKE_COLOR,
        strokeWidth: strokeWidth || STROKE_WIDTH,
        strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
      });
      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor || FILL_COLOR,
        stroke: strokeColor || STROKE_COLOR,
        strokeWidth: strokeWidth || STROKE_WIDTH,
        strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
      });
      addToCanvas(object);
    },

    addInverseTriangle: () => {
      const WIDTH = TRIANGLE_OPTIONS.width;
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor || FILL_COLOR,
          stroke: strokeColor || STROKE_COLOR,
          strokeWidth: strokeWidth || STROKE_WIDTH,
          strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
        },
      );
      addToCanvas(object);
    },

    addDiamond: () => {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;
      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor || FILL_COLOR,
          stroke: strokeColor || STROKE_COLOR,
          strokeWidth: strokeWidth || STROKE_WIDTH,
          strokeDashArray: strokeDashArray || STROKE_DASH_ARRAY,
        },
      );
      addToCanvas(object);
    },
    canvas,
    getActiveFillColor,
    getActiveStrokeColor,
    getActiveStrokeWidth,
    getActiveStrokeDashArray,
    getActiveOpacity,
    selectedObjects,
  };
};

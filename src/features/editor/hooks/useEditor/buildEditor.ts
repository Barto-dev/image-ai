import { BuildEditor, TextAlign } from '@/features/editor/types';
import { fabric } from 'fabric';
import {
  createFilter,
  isFabricTypeImage,
  isFabricTypeText,
  isTextboxObject,
} from '@/features/editor/utils';
import {
  CIRCLE_OPTIONS,
  DEFAULT_FONT_FAMILY,
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
  fontFamily,
  setFontFamily,
  setFontWeight,
  fontWeight,
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
  selectedObjects,
  copy,
  paste,
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

  const getActiveFontSize = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return selectedObject.get('fontSize') || fontSize;
    }
    return fontSize;
  };

  const getActiveTextAlign = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return (selectedObject.get('textAlign') as TextAlign) || textAlign;
    }
    return textAlign;
  };

  const getActiveFontStyle = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return selectedObject.get('fontStyle') || fontStyle;
    }
    return fontStyle;
  };

  const getActiveFontFamily = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return selectedObject.get('fontFamily') || fontFamily;
    }
    return fontFamily;
  };

  const getActiveFontWeight = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return (selectedObject.get('fontWeight') as number) || fontWeight;
    }
    return fontWeight;
  };

  const getActiveFontLinethrough = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return !!selectedObject.get('linethrough');
    }
    return fontLinethrough;
  };

  const getActiveFontUnderline = () => {
    const selectedObject = selectedObjects[0];
    if (isTextboxObject(selectedObject)) {
      return !!selectedObject.get('underline');
    }
    return fontUnderline;
  };

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

    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },

    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },

    changeImageFilter: (filter) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isFabricTypeImage(object.type)) {
          const imageObject = object as fabric.Image;
          const effect = createFilter(filter);
          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas.renderAll();
        }
      });
    },

    changeFontSize: (fontSize) => {
      setFontSize(fontSize);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ fontSize });
        }
      });
      canvas.renderAll();
    },

    changeTextAlign: (textAlign) => {
      setTextAlign(textAlign);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ textAlign });
        }
      });
      canvas.renderAll();
    },

    changeFontUnderline: (underline) => {
      setFontUnderline(underline);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ underline });
        }
      });
      canvas.renderAll();
    },

    changeFontLinethrough: (linethrough) => {
      setFontLinethrough(linethrough);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ linethrough });
        }
      });
      canvas.renderAll();
    },

    changeFontStyle: (fontStyle) => {
      setFontStyle(fontStyle);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ fontStyle });
        }
      });
      canvas.renderAll();
    },

    changeFontWeight: (fontWeight) => {
      setFontWeight(fontWeight);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ fontWeight });
        }
      });
      canvas.renderAll();
    },

    changeFontFamily: (fontFamily) => {
      setFontFamily(fontFamily);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextboxObject(object)) {
          object.set({ fontFamily });
        }
      });
      canvas.renderAll();
    },

    changeFillColor: (color) => {
      setFillColor(color);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: color });
      });
      canvas.renderAll();
    },

    changeStrokeColor: (color) => {
      setStrokeColor(color);
      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke property
        if (isFabricTypeText(object.type)) {
          object.set({ fill: color });
          return;
        }
        object.set({ stroke: color });
      });
      canvas.freeDrawingBrush.color = color;
      canvas.renderAll();
    },

    changeStrokeWidth: (width) => {
      setStrokeWidth(width);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: width });
      });
      canvas.freeDrawingBrush.width = width;
      canvas.renderAll();
    },

    changeStrokeDashArray: (dashArray) => {
      setStrokeDashArray(dashArray);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: dashArray });
      });
      canvas.renderAll();
    },

    changeOpacity: (opacity) => {
      setOpacity(opacity);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity });
      });
      canvas.renderAll();
    },

    addImage: (url: string) => {
      fabric.Image.fromURL(
        url,
        (image) => {
          const workspace = getWorkspace();
          image.scaleToWidth(workspace?.width || 0);
          image.scaleToHeight(workspace?.height || 0);
          addToCanvas(image);
        },
        {
          crossOrigin: 'anonymous',
        },
      );
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        fill: fillColor || FILL_COLOR,
        fontFamily: fontFamily || DEFAULT_FONT_FAMILY,
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
    deleteActiveObject: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    canvas,
    getActiveFillColor,
    getActiveStrokeColor,
    getActiveStrokeWidth,
    getActiveStrokeDashArray,
    getActiveOpacity,
    getActiveFontFamily,
    getActiveFontWeight,
    getActiveFontStyle,
    getActiveFontLinethrough,
    getActiveFontUnderline,
    getActiveTextAlign,
    getActiveFontSize,
    copy,
    paste,
    selectedObjects,
  };
};

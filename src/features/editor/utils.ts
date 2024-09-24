import { RGBColor } from 'react-color';
import { fabric } from 'fabric';
import { FilterType } from '@/features/editor/types';

export const isFabricTypeText = (type: string | undefined) => {
  return type === 'text' || type === 'i-text' || type === 'textbox';
};

export const isFabricTypeImage = (type: string | undefined) => {
  return type === 'image';
};

export const rgbaObjectToString = (rgba: RGBColor | 'transparent') => {
  if (rgba === 'transparent') {
    return 'rgba(0, 0, 0, 0)';
  }
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a || 1})`;
};

export const isTextboxObject = (object: fabric.Object | null) => {
  return object instanceof fabric.Textbox;
};

export const isImageObject = (object: fabric.Object | null) => {
  return object instanceof fabric.Image;
};

export const createFilter = (filter: FilterType) => {
  let effect;

  switch (filter) {
    case 'saturation':
      effect = new fabric.Image.filters.Saturation({ saturation: 0.7 });
      break;
    case 'grayscale':
      effect = new fabric.Image.filters.Grayscale();
      break;
    case 'polaroid':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Polaroid();
      break;
    case 'sepia':
      effect = new fabric.Image.filters.Sepia();
      break;
    case 'kodachrome':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case 'contrast':
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case 'brightness':
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case 'brownie':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Brownie();
      break;
    case 'vintage':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Vintage();
      break;
    case 'technicolor':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Technicolor();
      break;
    case 'pixelate':
      effect = new fabric.Image.filters.Pixelate();
      break;
    case 'invert':
      effect = new fabric.Image.filters.Invert();
      break;
    case 'blur':
      effect = new fabric.Image.filters.Blur();
      break;
    case 'sharpen':
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case 'emboss':
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case 'removecolor':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case 'blacknwhite':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.BlackWhite();
      break;
    case 'vibrance':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Vibrance({ vibrance: 1 });
      break;
    case 'blendcolor':
      effect = new fabric.Image.filters.BlendColor({
        color: '#00ff00',
        mode: 'multiply',
      });
      break;
    case 'huerotate':
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case 'resize':
      effect = new fabric.Image.filters.Resize();
      break;
    case 'gamma':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      effect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};

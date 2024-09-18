import { RGBColor } from 'react-color';

export const isFabricTextType = (type: string | undefined) => {
  return type === 'text' || type === 'i-text' || type === 'textbox';
};

export const rgbaObjectToString = (rgba: RGBColor | 'transparent') => {
  if (rgba === 'transparent') {
    return 'rgba(0, 0, 0, 0)';
  }
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a || 1})`;
};

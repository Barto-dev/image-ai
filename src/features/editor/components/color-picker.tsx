import { ChromePicker, CirclePicker } from 'react-color';
import { MATERIAL_COLORS } from '@/features/editor/constants';
import { rgbaObjectToString } from '@/features/editor/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={MATERIAL_COLORS}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
      />
    </div>
  );
};

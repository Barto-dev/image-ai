import { ActiveTool, BuildEditor } from '../types';
import { BsBorderWidth } from 'react-icons/bs';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  SquareSplitHorizontal,
  TrashIcon,
} from 'lucide-react';
import { RxTransparencyGrid } from 'react-icons/rx';
import { isFabricTypeImage, isFabricTypeText } from '@/features/editor/utils';
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa';
import { ToolbarButton } from './toolbar-button';
import { FontSizeInput } from './font-size-input';
import { DEFAULT_FONT_SIZE } from '@/features/editor/constants';
import { TbColorFilter } from 'react-icons/tb';

interface ToolbarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

// TODO:handle lost focus on input when rerendering
export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const font = editor?.getActiveFontFamily();
  const fontSize = editor?.getActiveFontSize() || DEFAULT_FONT_SIZE;
  const fontWeight = editor?.getActiveFontWeight();
  const fontStyle = editor?.getActiveFontStyle();
  const fontLinethrough = editor?.getActiveFontLinethrough();
  const fontUnderline = editor?.getActiveFontUnderline();
  const textAlign = editor?.getActiveTextAlign();
  const strokeColor = editor?.getActiveStrokeColor();
  const selectedObjects = editor?.selectedObjects;
  const isSelectedText = isFabricTypeText(selectedObjects?.[0]?.type);
  const isSelectedImage = isFabricTypeImage(selectedObjects?.[0]?.type);

  const changeFontWeight = () => {
    const activeFontWeight = editor?.getActiveFontWeight();
    const newValue = Number(activeFontWeight) > 400 ? 400 : 700;
    editor?.changeFontWeight(newValue);
  };

  const changeFontStyle = () => {
    const activeFontStyle = editor?.getActiveFontStyle();
    const newValue = activeFontStyle === 'italic' ? 'normal' : 'italic';
    editor?.changeFontStyle(newValue);
  };

  const changeFontLinethrough = () => {
    const activeFontLinethrough = editor?.getActiveFontLinethrough();
    editor?.changeFontLinethrough(!activeFontLinethrough);
  };

  const changeFontUnderline = () => {
    const activeFontUnderline = editor?.getActiveFontUnderline();
    editor?.changeFontUnderline(!activeFontUnderline);
  };

  if (!selectedObjects?.length) {
    return (
      <div className="shrink-0 h-editor-toolbar border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-editor-toolbar border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2.5">
      {!isSelectedImage && (
        <ToolbarButton
          label="Color"
          active={activeTool === 'fill'}
          onClick={() => onChangeActiveTool('fill')}
        >
          <span
            className="rounded-sm size-4 border"
            style={{
              backgroundColor: fillColor,
            }}
          />
        </ToolbarButton>
      )}

      {!isSelectedText && (
        <>
          <ToolbarButton
            label="Border color"
            active={activeTool === 'stroke-color'}
            onClick={() => onChangeActiveTool('stroke-color')}
          >
            <span
              className="rounded-sm size-4 border-2 bg-white"
              style={{
                borderColor: strokeColor,
              }}
            />
          </ToolbarButton>

          <ToolbarButton
            label="Border width"
            active={activeTool === 'stroke-width'}
            onClick={() => onChangeActiveTool('stroke-width')}
          >
            <BsBorderWidth className="size-4" />
          </ToolbarButton>
        </>
      )}

      {isSelectedText && (
        <ToolbarButton
          size="default"
          label="Font"
          active={activeTool === 'font'}
          onClick={() => onChangeActiveTool('font')}
        >
          <span className="max-w-24 truncate">{font}</span>
          <ChevronDown className="size-4 ml-2 shrink-0" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Bold"
          active={Number(fontWeight) > 400}
          onClick={changeFontWeight}
        >
          <FaBold className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Italic"
          active={fontStyle === 'italic'}
          onClick={changeFontStyle}
        >
          <FaItalic className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Linethrough"
          active={!!fontLinethrough}
          onClick={changeFontLinethrough}
        >
          <FaStrikethrough className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Underline"
          active={!!fontUnderline}
          onClick={changeFontUnderline}
        >
          <FaUnderline className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Align left"
          active={textAlign === 'left'}
          onClick={() => editor?.changeTextAlign('left')}
        >
          <AlignLeft className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Align center"
          active={textAlign === 'center'}
          onClick={() => editor?.changeTextAlign('center')}
        >
          <AlignCenter className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <ToolbarButton
          label="Align right"
          active={textAlign === 'right'}
          onClick={() => editor?.changeTextAlign('right')}
        >
          <AlignRight className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedText && (
        <div className="center h-full">
          <FontSizeInput
            onChange={(value) => editor?.changeFontSize(value)}
            value={fontSize}
          />
        </div>
      )}

      {isSelectedImage && (
        <ToolbarButton
          label="Filter"
          active={activeTool === 'filter'}
          onClick={() => onChangeActiveTool('filter')}
        >
          <TbColorFilter className="size-4" />
        </ToolbarButton>
      )}

      {isSelectedImage && (
        <ToolbarButton
          label="Remove background"
          active={activeTool === 'remove-bg'}
          onClick={() => onChangeActiveTool('remove-bg')}
        >
          <SquareSplitHorizontal className="size-4" />
        </ToolbarButton>
      )}

      <ToolbarButton
        label="Bring forward"
        onClick={() => editor?.bringForward()}
      >
        <ArrowUp className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        label="Send backwards"
        onClick={() => editor?.sendBackwards()}
      >
        <ArrowDown className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        label="Opacity"
        active={activeTool === 'opacity'}
        onClick={() => onChangeActiveTool('opacity')}
      >
        <RxTransparencyGrid className="size-4" />
      </ToolbarButton>

      <ToolbarButton
        label="Delete"
        onClick={() => editor?.deleteActiveObject()}
      >
        <TrashIcon className="size-4" />
      </ToolbarButton>
    </div>
  );
};

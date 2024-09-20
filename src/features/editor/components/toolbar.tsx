import { ActiveTool, BuildEditor } from '../types';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BsBorderWidth } from 'react-icons/bs';
import { ArrowDown, ArrowUp, ChevronDown } from 'lucide-react';
import { RxTransparencyGrid } from 'react-icons/rx';
import { isFabricTextType } from '@/features/editor/utils';

interface ToolbarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const font = editor?.getActiveFontFamily();
  const strokeColor = editor?.getActiveStrokeColor();
  const selectedObjects = editor?.selectedObjects;
  const isSelectedText = isFabricTextType(selectedObjects?.[0]?.type);

  if (!selectedObjects?.length) {
    return (
      <div className="shrink-0 h-editor-toolbar border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-editor-toolbar border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      <div className="center h-full">
        <Hint
          label="Color"
          side="bottom"
          sideOffset={5}
        >
          <Button
            className={cn(activeTool === 'fill' && 'bg-gray-100')}
            size="icon"
            variant="ghost"
            onClick={() => onChangeActiveTool('fill')}
          >
            <span
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>
      {!isSelectedText && (
        <div className="center h-full">
          <Hint
            label="Border color"
            side="bottom"
            sideOffset={5}
          >
            <Button
              className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
              size="icon"
              variant="ghost"
              onClick={() => onChangeActiveTool('stroke-color')}
            >
              <span
                className="rounded-sm size-4 border-2 bg-white"
                style={{
                  borderColor: strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isSelectedText && (
        <div className="center h-full">
          <Hint
            label="Border width"
            side="bottom"
            sideOffset={5}
          >
            <Button
              className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
              size="icon"
              variant="ghost"
              onClick={() => onChangeActiveTool('stroke-width')}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {isSelectedText && (
        <div className="center h-full">
          <Hint
            label="Font"
            side="bottom"
            sideOffset={5}
          >
            <Button
              className={cn(activeTool === 'font' && 'bg-gray-100')}
              variant="ghost"
              onClick={() => onChangeActiveTool('font')}
            >
              <span className="max-w-24 truncate">{font}</span>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      <div className="center h-full">
        <Hint
          label="Bring forward"
          side="bottom"
          sideOffset={5}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.bringForward()}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="center h-full">
        <Hint
          label="Send backwards"
          side="bottom"
          sideOffset={5}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.sendBackwards()}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>

        <Hint
          label="Opacity"
          side="bottom"
          sideOffset={5}
        >
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === 'opacity' && 'bg-gray-100')}
            onClick={() => onChangeActiveTool('opacity')}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

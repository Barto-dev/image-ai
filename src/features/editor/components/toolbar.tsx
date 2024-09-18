import { ActiveTool, BuildEditor } from '../types';
import { useState } from 'react';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const fillColor = editor?.fillColor;
  const selectedObjects = editor?.selectedObjects;

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
    </div>
  );
};

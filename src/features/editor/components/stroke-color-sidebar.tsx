import { ActiveTool, BuildEditor } from '../types';
import { cn } from '@/lib/utils';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { STROKE_COLOR } from '@/features/editor/constants';

interface StrokeColorSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

// TODO: reuse the same parts in ColorSidebar component
export const StrokeColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeColorSidebarProps) => {
  const fillColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeStrokeColor = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex-col hidden',
        activeTool === 'stroke-color' && 'flex',
      )}
    >
      <ToolSidebarHeader
        title="Border Color"
        description="Change the border color of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={fillColor}
            onChange={onChangeStrokeColor}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

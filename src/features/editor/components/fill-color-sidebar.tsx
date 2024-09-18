import { ActiveTool, BuildEditor } from '../types';
import { cn } from '@/lib/utils';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { FILL_COLOR } from '@/features/editor/constants';

interface FillColorSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) => {
  const value = editor?.fillColor || FILL_COLOR;
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeFillColor = (color: string) => {
    editor?.changeFillColor(color);
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex-col hidden',
        activeTool === 'fill' && 'flex',
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={value}
            onChange={onChangeFillColor}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

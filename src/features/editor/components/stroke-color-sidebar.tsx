import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { STROKE_COLOR } from '@/features/editor/constants';
import { SidebarWrapper } from './sidebar-wrapper';

interface StrokeColorSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

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
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="stroke-color"
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
    </SidebarWrapper>
  );
};

import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { FILL_COLOR } from '@/features/editor/constants';
import { SidebarWrapper } from './sidebar-wrapper';

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
  const fillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeFillColor = (color: string) => {
    editor?.changeFillColor(color);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="fill"
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={fillColor}
            onChange={onChangeFillColor}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

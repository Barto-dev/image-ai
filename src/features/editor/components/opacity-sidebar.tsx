import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DEFAULT_OPACITY } from '@/features/editor/constants';
import { SidebarWrapper } from './sidebar-wrapper';
import { Slider } from '@/components/ui/slider';

interface OpacitySidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const opacity = editor?.getActiveOpacity() || DEFAULT_OPACITY;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeOpacity = (value: number) => {
    editor?.changeOpacity(value);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="opacity"
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Adjust the opacity of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            onValueChange={(values) => onChangeOpacity(values[0])}
            value={[opacity]}
            max={DEFAULT_OPACITY}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

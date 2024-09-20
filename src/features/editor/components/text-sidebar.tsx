import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { Button } from '@/components/ui/button';

interface TextSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="text"
    >
      <ToolSidebarHeader
        title="Text"
        description="Add text to your design"
      />
      <ScrollArea>
        <div className="p-4 space-y-4">
          <Button
            className="w-full h-14"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText('Heading', {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold">Heading</span>
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText('Subheading', {
                fontSize: 52,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold">Subheading</span>
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            size="lg"
            onClick={() => editor?.addText('Paragraph')}
          >
            <span className="text-base">Paragraph</span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { Button } from '@/components/ui/button';
import { DEFAULT_FONT_FAMILY, FONTS } from '@/features/editor/constants';

interface FontSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const activeFont = editor?.getActiveFontFamily() || DEFAULT_FONT_FAMILY;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="font"
    >
      <ToolSidebarHeader
        title="Font"
        description="Choose a font for your text"
      />
      <ScrollArea>
        <div className="p-4 space-y-3">
          {FONTS.map((font) => (
            <Button
              key={font}
              variant={font === activeFont ? 'default' : 'secondary'}
              size="lg"
              className="w-full text-left justify-start text-lg"
              style={{ fontFamily: font }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

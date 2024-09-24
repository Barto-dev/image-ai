import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { Button } from '@/components/ui/button';
import { FILTERS } from '@/features/editor/constants';

interface FilterSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="filter"
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to your images"
      />
      <ScrollArea>
        <div className="p-4 space-y-3">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="w-full text-left justify-start text-lg capitalize"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

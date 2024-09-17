import { ActiveTool } from '../types';
import { cn } from '@/lib/utils';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShapeTool } from './shape-tool';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaDiamond } from 'react-icons/fa6';

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex-col hidden',
        activeTool === 'shapes' && 'flex',
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes you your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            icon={FaCircle}
            onClick={() => {}}
          />
          <ShapeTool
            icon={FaSquare}
            onClick={() => {}}
          />
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => {}}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {}}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {}}
            iconClassName="rotate-180"
          />
          <ShapeTool
            icon={FaDiamond}
            onClick={() => {}}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

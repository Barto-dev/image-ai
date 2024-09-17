import { ActiveTool, BuildEditor } from '../types';
import { cn } from '@/lib/utils';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShapeTool } from './shape-tool';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaDiamond } from 'react-icons/fa6';

interface ShapeSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  editor,
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
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            icon={FaCircle}
            onClick={() => editor?.addCircle()}
          />
          <ShapeTool
            icon={FaSquare}
            onClick={() => editor?.addSofRectangle()}
          />
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => editor?.addRectangle()}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => editor?.addTriangle()}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => editor?.addInverseTriangle()}
            iconClassName="rotate-180"
          />
          <ShapeTool
            icon={FaDiamond}
            onClick={() => editor?.addDiamond()}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

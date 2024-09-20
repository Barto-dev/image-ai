import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from '@/features/editor/constants';
import { SidebarWrapper } from './sidebar-wrapper';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StrokeWidthSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const strokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const strokeDashArray =
    editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeStrokeWidth = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="stroke-width"
    >
      <ToolSidebarHeader
        title="Border Opions"
        description="Change the border style of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Border width</Label>
          <Slider
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
            value={[strokeWidth]}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Border type</Label>
          <Button
            variant={!strokeDashArray.length ? 'default' : 'secondary'}
            size="lg"
            className={cn('w-full h-16 justify-start text-left py-2 px-4')}
            onClick={() => onChangeStrokeType([])}
          >
            <span className="w-full border-current rounded-full border-4" />
          </Button>
          <Button
            variant={!!strokeDashArray.length ? 'default' : 'secondary'}
            size="lg"
            className="w-full h-16 justify-start text-left py-2 px-4"
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <span className="w-full border-current rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

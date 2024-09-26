import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { STROKE_COLOR, STROKE_WIDTH } from '@/features/editor/constants';
import { SidebarWrapper } from './sidebar-wrapper';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface DrawSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const brushColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const brushWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool('select');
  };

  const onChangeBrushColor = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  const onChangeBrushWidth = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="draw"
    >
      <ToolSidebarHeader
        title="Drawing mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Brush width</Label>
          <Slider
            onValueChange={(values) => onChangeBrushWidth(values[0])}
            value={[brushWidth]}
          />
        </div>
        <div className="p-4 space-y-6">
          <ColorPicker
            value={brushColor}
            onChange={onChangeBrushColor}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

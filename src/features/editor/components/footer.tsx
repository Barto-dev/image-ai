import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Minimize, ZoomIn, ZoomOut } from 'lucide-react';
import { BuildEditor } from '@/features/editor/types';

interface FooterProps {
  editor: ReturnType<BuildEditor> | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="h-[52px] border-t bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-1 shrink-0 px-4 flex-row-reverse">
      <Hint
        label="Reset"
        side="top"
        sideOffset={10}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-full"
          onClick={editor?.autoZoom}
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>
      <Hint
        label="Zoom Out"
        side="top"
        sideOffset={10}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-full"
          onClick={editor?.zoomOut}
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
      <Hint
        label="Zoom In"
        side="top"
        sideOffset={10}
      >
        <Button
          size="icon"
          variant="ghost"
          className="h-full"
          onClick={editor?.zoomIn}
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};

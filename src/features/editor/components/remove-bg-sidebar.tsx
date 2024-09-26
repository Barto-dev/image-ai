import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { Button } from '@/components/ui/button';
import { getObjectImageSrc } from '@/features/editor/utils';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRemoveBg } from '@/features/ai/api/useRemoveBg';

interface RemoveBgSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const mutation = useRemoveBg();
  const imageSrc = getObjectImageSrc(editor?.selectedObjects?.[0]);
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onRemoveBackground = async () => {
    // TODO: Block with paywall
    const { data } = await mutation.mutateAsync({ image: imageSrc });
    editor?.addImage(data);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="remove-bg"
    >
      <ToolSidebarHeader
        title="Remove Background"
        description="Remove the background from an image using AI"
      />
      {!imageSrc && (
        <div className="center flex-col gap-y-4 flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature is only available for images
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 grid gap-3">
            <div
              className={cn(
                'relative aspect-square rounded-md overflow-hidden transition bg-muted',
                mutation.isPending && 'opacity-50',
              )}
            >
              <Image
                src={imageSrc}
                alt="Selected image"
                layout="fill"
                className="object-cover"
              />
            </div>
            <Button
              className="w-full"
              onClick={onRemoveBackground}
              disabled={mutation.isPending}
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGenerateImage } from '@/features/ai/api/useGenerateImage';
import { FormEvent, useState } from 'react';

interface AiSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const mutation = useGenerateImage();
  const [value, setValue] = useState('');

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Block with paywall
    const { data } = await mutation.mutateAsync({
      prompt: value,
    });
    editor?.addImage(data);
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="ai"
    >
      <ToolSidebarHeader
        title="AI"
        description="Generate an image using AI"
      />
      <ScrollArea>
        <form
          className="p-4 space-y-3"
          onSubmit={onSubmit}
        >
          <Textarea
            placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={5}
            required
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={mutation.isPending}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

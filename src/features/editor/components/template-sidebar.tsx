import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { AlertTriangle, Loader } from 'lucide-react';
import Image from 'next/image';
import {
  GetTemplatesResponseType,
  useGetTemplates,
} from '@/features/projects/api/useGetTemplates';
import { useConfirm } from '@/hooks/useConfirm';

interface TemplateSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplateSidebarProps) => {
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'This will clear your current design',
  });

  const { data, isLoading, isError } = useGetTemplates({
    limit: '20',
    page: '1',
  });
  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onTemplateClick = async (
    template: GetTemplatesResponseType['data'][number],
  ) => {
    const ok = await confirm();
    if (ok) {
      editor?.loadJson(template.json);
    }
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="templates"
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose an image for your design"
      />
      {isLoading && (
        <div className="center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="center flex-col flex-1 gap-y-3">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to fetch templates
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 grid grid-cols-2 gap-2">
          {data &&
            data.map((template) => (
              <div
                key={template.id}
                className="relative group rounded-sm overflow-hidden border"
              >
                <button
                  style={{
                    aspectRatio: `${template.width}/${template.height}`,
                  }}
                  className="w-full group-hover:opacity-75 transition bg-muted"
                  onClick={() => onTemplateClick(template)}
                >
                  <Image
                    fill
                    src={template.thumbnailUrl || ''}
                    alt={template.name || 'Template'}
                    className="object-cover"
                  />
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-0 left-0 text-xs w-full truncate p-1 bg-black/50 text-left text-white">
                  {template.name}
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

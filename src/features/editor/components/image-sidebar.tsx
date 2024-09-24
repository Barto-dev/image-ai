import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarWrapper } from './sidebar-wrapper';
import { useGetImages } from '@/features/images/api/useGetImages';
import { AlertTriangle, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UploadButton } from '@/lib/uploadthing';

interface ImageSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages({
    enabled: activeTool === 'images',
  });
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="images"
    >
      <ToolSidebarHeader
        title="Images"
        description="Choose an image for your design"
      />
      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button:
              'w-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90',
            allowedContent: 'hidden',
          }}
          content={{
            button: 'Upload Image',
          }}
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
          endpoint="imageUploader"
        />
      </div>
      {isLoading && (
        <div className="center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="center flex-col flex-1 gap-y-3">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 grid grid-cols-2 gap-2">
          {data &&
            data.images.map((image) => (
              <div
                key={image.id}
                className="relative group rounded-sm overflow-hidden border"
              >
                <button
                  className="w-full h-24 group-hover:opacity-75 transition bg-muted"
                  onClick={() => editor?.addImage(image.urls.regular)}
                >
                  <Image
                    fill
                    src={image.urls.small}
                    alt={image.alt_description || 'Image'}
                    className="object-cover"
                  />
                </button>
                <Link
                  target="_blank"
                  className="opacity-0 group-hover:opacity-100 transition absolute bottom-0 left-0 text-xs w-full truncate hover:underline p-1 bg-black/50 text-left text-white"
                  href={image.links.html}
                >
                  {image.user.name}
                </Link>
              </div>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

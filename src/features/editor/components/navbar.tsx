'use client';

import { Logo } from './logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from 'lucide-react';
import { CiFileOn } from 'react-icons/ci';
import { Separator } from '@/components/ui/separator';
import { Hint } from '@/components/hint';
import { BsCloudCheck } from 'react-icons/bs';
import { ActiveTool, BuildEditor } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { useFilePicker } from 'use-file-picker';
import { SelectedFiles } from 'use-file-picker/types';
import { UserButton } from '@/features/auth/components/user-button';
import { useMutationState } from '@tanstack/react-query';
import { SavingStatus } from '@/features/editor/components/saving-status';

interface NavbarProps {
  initialDataId: string;
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
  initialDataId,
  activeTool,
  onChangeActiveTool,
  editor,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ['project', { id: initialDataId }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];
  const isError = currentStatus === 'error';
  const isPending = currentStatus === 'pending';

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSuccessfullySelected: ({ plainFiles }: SelectedFiles<string>) => {
      if (plainFiles && plainFiles.length) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-editor-navbar gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
            >
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-60"
          >
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={openFilePicker}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator
          orientation="vertical"
          className="mx-2"
        />
        <Hint
          label="Select"
          side="bottom"
          sideOffset={10}
        >
          <Button
            aria-label="Select"
            variant="ghost"
            size="icon"
            className={cn(activeTool === 'select' && 'bg-muted')}
            onClick={() => onChangeActiveTool('select')}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>

        <Hint
          label="Undo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            disabled={!editor?.canUndo()}
            aria-label="Undo"
            variant="ghost"
            size="icon"
            onClick={() => editor?.undo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>

        <Hint
          label="Redo"
          side="bottom"
          sideOffset={10}
        >
          <Button
            disabled={!editor?.canRedo()}
            aria-label="Redo"
            variant="ghost"
            size="icon"
            onClick={() => editor?.redo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator
          orientation="vertical"
          className="mx-2"
        />
        <SavingStatus
          isError={isError}
          isPending={isPending}
        />
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
              >
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-60"
            >
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveJson}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.savePng}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveJpg}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Ideal for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={editor?.saveSvg}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    For editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

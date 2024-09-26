import { ActiveTool, BuildEditor } from '../types';
import { ToolSidebarHeader } from './tool-sidebar-header';
import { ToolSidebarClose } from './tool-sidebar-close';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColorPicker } from './color-picker';
import { SidebarWrapper } from './sidebar-wrapper';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SettingsSidebarProps {
  editor: ReturnType<BuildEditor> | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkspace();
  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  const initialBackground = useMemo(
    () => (workspace?.fill as string) ?? '#fff',
    [workspace],
  );

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    if (!workspace) {
      return;
    }
    setWidth(`${workspace.width}`);
    setHeight(`${workspace.height}`);
    setBackground(workspace.fill as string);
  }, [initialWidth, initialHeight, initialBackground, workspace]);

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const changeBackground = (color: string) => {
    setBackground(color);
    editor?.changeWorkspaceBackground(color);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    editor?.changeWorkspaceSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    });
  };

  return (
    <SidebarWrapper
      activeTool={activeTool}
      sidebarTool="settings"
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea>
        <form
          onSubmit={onSubmit}
          className="p-4 grid gap-4"
        >
          <div>
            <Label className="mb-2">Width</Label>
            <Input
              placeholder="Workspace width"
              value={width}
              onChange={(evt) => setWidth(evt.target.value)}
              type="number"
            />
          </div>
          <div>
            <Label className="mb-2">Height</Label>
            <Input
              placeholder="Workspace height"
              value={height}
              onChange={(evt) => setHeight(evt.target.value)}
              type="number"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
          >
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
            value={background}
            onChange={changeBackground}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </SidebarWrapper>
  );
};

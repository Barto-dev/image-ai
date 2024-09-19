import { ActiveTool } from '@/features/editor/types';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SidebarWrapperProps {
  activeTool: ActiveTool;
  sidebarTool: ActiveTool;
  children: ReactNode;
}

export const SidebarWrapper = ({
  activeTool,
  sidebarTool,
  children,
}: SidebarWrapperProps) => {
  return (
    <aside
      className={cn(
        'bg-white relative border-r z-40 w-90 h-full flex-col hidden',
        activeTool === sidebarTool && 'flex',
      )}
    >
      {children}
    </aside>
  );
};

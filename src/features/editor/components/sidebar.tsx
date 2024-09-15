'use client';

import { SidebarItem } from './sidebar-item';
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from 'lucide-react';
import { ActiveTool } from '@/features/editor/types';

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <li>
          <SidebarItem
            icon={LayoutTemplate}
            label="Design"
            isActive={activeTool === 'templates'}
            onClick={() => onChangeActiveTool('templates')}
          />
        </li>
        <li>
          <SidebarItem
            icon={ImageIcon}
            label="Image"
            isActive={activeTool === 'images'}
            onClick={() => onChangeActiveTool('images')}
          />
        </li>
        <li>
          <SidebarItem
            icon={Type}
            label="Text"
            isActive={activeTool === 'text'}
            onClick={() => onChangeActiveTool('text')}
          />
        </li>
        <li>
          <SidebarItem
            icon={Shapes}
            label="Shapes"
            isActive={activeTool === 'shapes'}
            onClick={() => onChangeActiveTool('shapes')}
          />
        </li>
        <li>
          <SidebarItem
            icon={Sparkles}
            label="AI"
            isActive={activeTool === 'ai'}
            onClick={() => onChangeActiveTool('ai')}
          />
        </li>
        <li>
          <SidebarItem
            icon={Settings}
            label="Settings"
            isActive={activeTool === 'settings'}
            onClick={() => onChangeActiveTool('settings')}
          />
        </li>
      </ul>
    </aside>
  );
};

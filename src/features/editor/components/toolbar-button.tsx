import { Button } from '@/components/ui/button';
import { Hint } from '@/components/hint';
import { ReactNode } from 'react';

interface ToolbarButtonProps {
  label: string;
  size?: 'default' | 'icon';
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const ToolbarButton = ({
  label,
  active,
  onClick,
  children,
  size = 'icon',
}: ToolbarButtonProps) => (
  <div className="center h-full">
    <Hint
      label={label}
      side="bottom"
      sideOffset={5}
    >
      <Button
        size={size}
        variant={active ? 'secondary' : 'ghost'}
        onClick={onClick}
      >
        {children}
      </Button>
    </Hint>
  </div>
);

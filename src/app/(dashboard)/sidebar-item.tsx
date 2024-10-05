import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
  disabled,
}: SidebarItemProps) => {
  const Component = href ? Link : 'button';

  return (
    <Component
      href={href || ''}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        className={cn(
          'flex items-center p-3 rounded-md bg-transparent hover:bg-white hover:opacity-75 transition',
          isActive && 'bg-white',
        )}
      >
        <Icon className="size-4 mr-2 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </span>
    </Component>
  );
};

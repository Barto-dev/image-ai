import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProLabelProps {
  className?: string;
}

export const ProLabel = ({ className }: ProLabelProps) => {
  return (
    <span
      className={cn(
        'absolute z-10 center bg-black/50 rounded-full size-10',
        className,
      )}
    >
      <Crown className="size-1/2 fill-yellow-500 text-yellow-500" />
    </span>
  );
};

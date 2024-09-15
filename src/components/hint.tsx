import { ReactNode } from 'react';
import { TooltipContentProps } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HintProps {
  label: string;
  children: ReactNode;
  side?: TooltipContentProps['side'];
  align?: TooltipContentProps['align'];
  sideOffset?: TooltipContentProps['sideOffset'];
  alignOffset?: TooltipContentProps['alignOffset'];
}

export const Hint = ({ label, children, ...props }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-slate-800 border-slate-800"
          {...props}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

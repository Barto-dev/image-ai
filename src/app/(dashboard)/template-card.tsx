import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ProLabel } from '@/components/pro-label';

interface TemplateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
}

export const TemplateCard = ({
  imageSrc,
  title,
  onClick,
  description,
  disabled,
  width,
  height,
  isPro,
}: TemplateCardProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'space-y-2 group text-left transition flex flex-col',
        disabled && 'opacity-75 cursor-not-allowed',
      )}
    >
      <span
        style={{ aspectRatio: `${width}/${height}` }}
        className="relative rounded-xl h-full w-full overflow-hidden border"
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="object-cover transition transform group-hover:scale-105"
        />
        {isPro && <ProLabel className="top-2 right-2" />}
        <span className="opacity-0 group-hover:opacity-100 transition absolute inset-0 bg-black/50 center rounded-xl backdrop-filter backdrop-blur-sm">
          <span className="text-white font-medium">Open in editor</span>
        </span>
      </span>
      <span className="flex flex-col gap-y-1 pl-1">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </span>
    </button>
  );
};

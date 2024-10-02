import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs';
import { Loader } from 'lucide-react';

interface SavingStatusProps {
  isError: boolean;
  isPending: boolean;
}

export const SavingStatus = ({ isError, isPending }: SavingStatusProps) => {
  if (isPending) {
    return (
      <div className="flex items-center gap-x-2">
        <Loader className="size-5 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Saving...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-x-2 text-red-400">
        <BsCloudSlash className="size-5 text-error" />
        <p className="text-xs text-error">Failed to save</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-2">
      <BsCloudCheck className="size-5 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">Saved</p>
    </div>
  );
};

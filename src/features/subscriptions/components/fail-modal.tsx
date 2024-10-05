import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFailModal } from '@/features/subscriptions/store/useFailModal';
import { useRouter } from 'next/navigation';

export const FailModal = () => {
  const router = useRouter();
  const isOpen = useFailModal.use.isOpen();
  const onClose = useFailModal.use.onClose();

  const handleClose = () => {
    router.replace('/');
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
          />
          <DialogTitle>Something went wrong</DialogTitle>
          <DialogDescription>
            We couldn&apos;t process your payment. Please try again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            onClick={handleClose}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

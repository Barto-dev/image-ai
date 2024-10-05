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
import { useRouter } from 'next/navigation';
import { useSuccessModal } from '@/features/subscriptions/store/useSuccessModal';

export const SuccessModal = () => {
  const router = useRouter();
  const isOpen = useSuccessModal.use.isOpen();
  const onClose = useSuccessModal.use.onClose();

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
          <DialogTitle>Payment successful</DialogTitle>
          <DialogDescription>
            Your payment was successful. Thank you for subscribing!
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

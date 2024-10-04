import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubscriptionModal } from '@/features/subscriptions/store/useSubscriptionModal';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SubscriptionModal = () => {
  const isOpen = useSubscriptionModal.use.isOpen();
  const onClose = useSubscriptionModal.use.onClose();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
          />
          <DialogTitle>Upgrade to PRO</DialogTitle>
          <DialogDescription>
            Unlock more features and templates with a PRO
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p>Unlimited projects</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p>Templates library</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p>AI Background removal</p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p>AI Image generation</p>
          </li>

          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p>Priority support</p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            disabled={false}
            onClick={() => {}}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

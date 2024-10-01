'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/features/projects/api/useCreateProject';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: 'Untitled project',
        json: '',
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          toast.success('Project created');
          router.push(`/editor/${data.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="text-white md:aspect-[5/1] min-h-52 flex p-6 gap-x-6 items-center rounded-2xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5]">
      <div className="rounded-full size-28 md:center bg-white/50 mb-4 hidden">
        <div className="rounded-full size-20 center bg-white">
          <Sparkles className="h-20 text-[#0073ff] fill-[#0073ff]" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Visualise your ideas with Image AI
        </h1>
        <p className="text-sm mb-2">Turn inspiration into design in no time</p>
        <Button
          variant="secondary"
          className="w-40"
          onClick={onClick}
          disabled={mutation.isPending}
        >
          Start creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

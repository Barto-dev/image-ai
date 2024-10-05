'use client';

import {
  GetTemplatesResponseType,
  useGetTemplates,
} from '@/features/projects/api/useGetTemplates';
import { Loader, TriangleAlert } from 'lucide-react';
import { TemplateCard } from '@/app/(dashboard)/template-card';
import { useCreateProject } from '@/features/projects/api/useCreateProject';
import { useRouter } from 'next/navigation';
import { usePaywall } from '@/features/subscriptions/hooks/usePaywall';

export const Templates = () => {
  const router = useRouter();
  const { shouldBlock, triggerPaywall } = usePaywall();
  const mutation = useCreateProject();
  const { data, isLoading, isError } = useGetTemplates({
    page: '1',
    limit: '4',
  });

  const onTemplateClick = (
    template: GetTemplatesResponseType['data'][number],
  ) => {
    if (template.isPro && shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="center h-32">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="center h-32 flex-col gap-y-4">
          <TriangleAlert className="size-6 text-muted-foreground" />
          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Start from a template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">
        {data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ''}
            onClick={() => onTemplateClick(template)}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};

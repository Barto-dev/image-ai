'use client';

import { Editor } from '@/features/editor/components/editor';
import { useGetProject } from '@/features/projects/api/useGetProject';
import { Loader, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading) {
    return (
      <div className="h-full center flex-col">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="h-full center flex-col gap-y-5">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">Failed to load project</p>
        <Button
          asChild
          variant="secondary"
        >
          <Link href="/">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;

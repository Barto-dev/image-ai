import { Editor } from '@/features/editor/components/editor';
import { protectRoute } from '@/features/auth/utils';

const EditorProjectIdPage = async () => {
  await protectRoute();
  return <Editor />;
};

export default EditorProjectIdPage;

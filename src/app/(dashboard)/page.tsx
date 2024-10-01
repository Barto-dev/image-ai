import { protectRoute } from '@/features/auth/utils';
import { Banner } from './banner';

export default async function Home() {
  await protectRoute();

  return (
    <div className="flex flex-col gap-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
    </div>
  );
}

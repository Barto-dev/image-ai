import { protectRoute } from '@/features/auth/utils';

export default async function Home() {
  await protectRoute();

  return <div>Home page</div>;
}

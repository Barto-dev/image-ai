import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <Button>Hi</Button>
    </div>
  );
}

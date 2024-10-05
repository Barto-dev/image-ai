import { InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useQuery } from '@tanstack/react-query';

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions)['current']['$get'],
  200
>;

export const useGetSubscription = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const res = await client.api.subscriptions.current.$get();
      if (!res.ok) {
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(data.error);
      }

      return res.json();
    },
  });

  return query;
};

import { InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions)['checkout']['$post'],
  200
>;

export const useCheckout = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.subscriptions.checkout.$post();
      if (!res.ok) {
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(data.error);
      }

      return res.json();
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });
  return mutation;
};

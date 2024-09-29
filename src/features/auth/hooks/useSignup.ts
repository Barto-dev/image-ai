import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';

type RequestType = InferRequestType<(typeof client.api.users)['$post']>['json'];
type ResponseType = InferResponseType<(typeof client.api.users)['$post']>;

export const useSignup = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (input) => {
      const res = await client.api.users.$post({ json: input });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      return res.json();
    },
  });
  return mutation;
};

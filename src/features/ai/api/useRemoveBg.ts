import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.ai)['remove-bg']['$post']
>['json'];

type ResponseType = InferResponseType<
  (typeof client.api.ai)['remove-bg']['$post']
>;

export const useRemoveBg = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (input) => {
      const res = await client.api.ai['remove-bg'].$post({ json: input });
      return res.json();
    },
  });
  return mutation;
};

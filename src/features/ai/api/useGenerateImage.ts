import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.ai)['generate']['$post']
>['json'];

type ResponseType = InferResponseType<
  (typeof client.api.ai)['generate']['$post']
>;

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (input) => {
      const res = await client.api.ai.generate.$post({ json: input });
      return res.json();
    },
  });
  return mutation;
};

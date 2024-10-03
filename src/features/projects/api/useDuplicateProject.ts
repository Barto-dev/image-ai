import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.projects)[':id']['duplicate']['$post']
>['param'];

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':id']['duplicate']['$post'],
  200
>;

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const res = await client.api.projects[':id']['duplicate'].$post({
        param: { id },
      });
      if (!res.ok) {
        const data = await res.json();
        // @ts-expect-error we know data.error is a string
        throw new Error(data.error);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
  return mutation;
};

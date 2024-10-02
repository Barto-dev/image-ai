import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.projects)[':id']['$patch']
>['json'];

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':id']['$patch'],
  200
>;

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ['project', { id }],
    mutationFn: async (input) => {
      const res = await client.api.projects[':id'].$patch({
        json: input,
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
      // Todo: Invalidate the projects query so it refetches
      queryClient.invalidateQueries({ queryKey: ['project', { id }] });
    },
  });
  return mutation;
};

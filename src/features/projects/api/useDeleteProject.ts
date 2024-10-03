import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.projects)[':id']['$delete']
>['param'];

type ResponseType = InferResponseType<
  (typeof client.api.projects)[':id']['$delete'],
  200
>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id }) => {
      const res = await client.api.projects[':id'].$delete({
        param: { id },
      });
      if (!res.ok) {
        const data = await res.json();
        // @ts-expect-error we know data.error is a string
        throw new Error(data.error);
      }

      return res.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', { id: data.id }] });
    },
  });
  return mutation;
};

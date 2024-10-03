import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type RequestType = InferRequestType<
  (typeof client.api.projects)['$post']
>['json'];
type ResponseType = InferResponseType<
  (typeof client.api.projects)['$post'],
  200
>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (input) => {
      const res = await client.api.projects.$post({ json: input });
      if (!res.ok) {
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

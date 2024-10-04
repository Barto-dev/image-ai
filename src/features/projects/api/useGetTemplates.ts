import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { InferRequestType, InferResponseType } from 'hono';

export type GetTemplateRequestType = InferRequestType<
  (typeof client.api.projects)['templates']['$get']
>['query'];

export type GetTemplatesResponseType = InferResponseType<
  (typeof client.api.projects)['templates']['$get'],
  200
>;

export const useGetTemplates = (apiQuery: GetTemplateRequestType) => {
  const query = useQuery({
    queryKey: ['templates', { page: apiQuery.page, limit: apiQuery.limit }],
    queryFn: async () => {
      const response = await client.api.projects['templates'].$get({
        query: apiQuery,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

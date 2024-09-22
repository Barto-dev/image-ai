import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';

interface UseGetImagesOptions {
  enabled: boolean;
}

export const useGetImages = ({ enabled }: UseGetImagesOptions) => {
  const query = useQuery({
    queryKey: ['images'],
    enabled,
    queryFn: async () => {
      const response = await client.api.images.$get();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};

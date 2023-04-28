import { QueryKey, useQuery, useQueryClient } from '@tanstack/react-query';
import appApi from '../features/shared/data-access/app.api';
import { setToken } from '../utils/token';

export const useGetQueryData = <T>(key: QueryKey) => {
  const client = useQueryClient();
  return client.getQueryData<T>(key);
};

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = localStorage.getItem('api_token');
      if (token) {
        setToken(token);
        return appApi.getCurrentUser();
      }
      return null;
    },
    initialData: null
  });

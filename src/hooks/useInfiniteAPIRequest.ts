import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCallback, useMemo} from 'react';

import {TExtendedMethod} from '~/types/TExtendedMethod';
import {filterNil} from '~/utils/filterNil';
import {getQueryKey} from '~/utils/getQueryKey';
import {log} from '~/utils/log.util';

import {onApiError} from './useOnApiError';

type TOptions<T> = Omit<
  UseInfiniteQueryOptions<
    T,
    AxiosError,
    InfiniteData<T>,
    T,
    QueryKey,
    string | undefined
  >,
  'queryKey' | 'queryFn'
>;

export const useInfiniteAPIRequest = <
  T extends TExtendedMethod,
  Response extends ReturnType<T>,
>(
  method: T,
  options: TOptions<Awaited<Response>['data']>,
  ...args: Parameters<T>
) => {
  const queryKey = useMemo(
    () => getQueryKey([method.getKeyName(), ...filterNil(args)]),
    [args, method],
  );

  const fetcher: QueryFunction<
    Awaited<Response>['data'],
    QueryKey,
    string | undefined
  > = useCallback(
    async context => {
      const {pageParam, queryKey} = context;
      const [name, ...rest] = queryKey;
      log.info(`[api] - Ran infinite: ${name}`, [...queryKey, pageParam]);

      try {
        const limit = rest.pop();
        const cursor = pageParam;

        return (await method(...[...rest, cursor, limit]))?.data;
      } catch (error) {
        onApiError(error, 'InfiniteQuery', method.getKeyName());
        throw error;
      }
    },
    [method],
  );

  return useInfiniteQuery({
    ...options,
    queryKey,
    queryFn: fetcher,
  });
};

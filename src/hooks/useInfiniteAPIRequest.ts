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
import {getQueryKey} from '~/utils/getQueryKey';
import {log} from '~/utils/log.util';

import {onApiError} from './useOnApiError';

type TOptions<T> = Omit<
  UseInfiniteQueryOptions<T, AxiosError, InfiniteData<T>, T, QueryKey, number>,
  'queryKey' | 'queryFn'
>;

export const useInfiniteAPIRequestV2 = <
  T extends TExtendedMethod,
  Response extends ReturnType<T>,
>(
  method: T,
  options: TOptions<Awaited<Response>['data']>,
  ...args: Parameters<T>
) => {
  const queryKey = useMemo(
    () => getQueryKey([method.getKeyName(), ...args]),
    [args, method],
  );

  const fetcher: QueryFunction<Awaited<Response>['data'], QueryKey, number> =
    useCallback(
      async context => {
        const {pageParam, queryKey} = context;
        const [name, ...rest] = queryKey;
        log.info(`[api] - Ran infinite: ${name}`, context.queryKey);

        try {
          const limit = rest.pop();
          const offset = pageParam;

          return (await method(...[...rest, limit, offset]))?.data;
        } catch (error) {
          onApiError(error, 'InfiniteQuery', method.getKeyName());
          throw error;
        }
      },
      [method],
    );

  return useInfiniteQuery({
    ...{initialPageParam: 0},
    ...options,
    queryKey,
    queryFn: fetcher,
  });
};

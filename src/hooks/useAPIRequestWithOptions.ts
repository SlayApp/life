import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {RawAxiosRequestConfig} from 'axios';
import {useCallback, useMemo} from 'react';

import {TExtendedMethod} from '~/types/TExtendedMethod';
import {getQueryKey} from '~/utils/getQueryKey';

import {onApiError} from './useOnApiError';

type TOptions<T> = Partial<
  Omit<
    UseQueryOptions<T | undefined, Error, T | undefined, QueryKey>,
    'queryKey' | 'queryFn'
  >
>;

export const useAPIRequestWithOptions = <
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
  const config: RawAxiosRequestConfig | undefined = args.at(-1);

  const fetcher: QueryFunction<Awaited<Response>['data'], QueryKey> =
    useCallback(
      async context => {
        const [_, ...rest] = context.queryKey;
        try {
          const {data} = await method(...rest);

          return data;
        } catch (error) {
          onApiError(error, 'Query', method.getKeyName());
          throw error;
        }
      },
      [method],
    );

  return useQuery<
    Awaited<Response>['data'] | undefined,
    Error,
    Awaited<Response>['data'] | undefined,
    QueryKey
  >({
    ...options,
    meta: config?.data,
    queryKey,
    queryFn: fetcher,
  });
};

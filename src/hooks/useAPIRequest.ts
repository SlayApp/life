import {QueryFunction, QueryKey, useQuery} from '@tanstack/react-query';
import {RawAxiosRequestConfig} from 'axios';
import {useCallback, useMemo} from 'react';

import {TExtendedMethod} from '~/types/TExtendedMethod';
import {getQueryKey} from '~/utils/getQueryKey';

import {onApiError} from './useOnApiError';

export const useAPIRequest = <
  T extends TExtendedMethod,
  Response extends ReturnType<T>,
>(
  method: T,
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
    meta: config?.data,
    queryKey,
    queryFn: fetcher,
  });
};

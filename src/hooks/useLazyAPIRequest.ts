import {
  QueryFunction,
  QueryKey,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {RawAxiosRequestConfig} from 'axios';
import {useCallback, useMemo, useState} from 'react';

import {TExtendedMethod} from '~/types/TExtendedMethod';
import {filterNil} from '~/utils/filterNil';
import {getQueryKey} from '~/utils/getQueryKey';
import {log} from '~/utils/log.util';

import {onApiError} from './useOnApiError';

/**
 * ONLY use me for GET requests
 * this calls the onFetch function twice to update the context
 * hence it should only be used on GET requests
 * @param method pass in the api-client method
 */
export const useLazyAPIRequest = <
  T extends TExtendedMethod,
  Response extends ReturnType<T>,
>(
  method: T,
) => {
  const client = useQueryClient();
  const [variables, setVariables] = useState<Parameters<T> | null>(null);
  const queryKey = useMemo(
    () => getQueryKey([method.getKeyName(), ...(variables ?? [])]),
    [variables, method],
  );

  const fetcher: QueryFunction<Awaited<Response>['data'], QueryKey> =
    useCallback(
      async context => {
        const [name, ...rest] = context.queryKey;
        log.info(`[api] - Lazy ran: ${name}`, context.queryKey);

        try {
          const {data} = await method(...rest);

          return data;
        } catch (error) {
          onApiError(error, 'Lazy', method.getKeyName());
          throw error;
        }
      },
      [method],
    );

  // @NOTE -> this fetcher is called whenever we call refetchQueries
  // and will trigger an actual api call, which is what we want
  const response = useQuery({
    queryKey,
    queryFn: fetcher,
    refetchOnMount: false,
    // will not auto call, and only read from cache
    // since `onFetch` calls `fetchQuery` with the same queryKey, the response gets updated after `onFetch` runs
    enabled: false,
  });

  const onFetch = useCallback(
    async (...args: Parameters<T>) => {
      const config: RawAxiosRequestConfig | undefined = args.at(-1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const keys: typeof args = filterNil(args) as any;

      setVariables(keys);
      const queryKey = getQueryKey([method.getKeyName(), ...keys]);

      return client.fetchQuery<
        Awaited<Response>['data'],
        Error,
        Awaited<Response>['data'],
        QueryKey
      >({
        meta: config?.data,
        queryKey,
        queryFn: fetcher,
      });
    },
    [client, method, fetcher],
  );

  // important else refetch will not work here since it doesn't have the data
  // use the fetch call instead
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response.refetch = undefined as any;

  return [onFetch, response] as [
    typeof onFetch,
    Omit<typeof response, 'refetch'>,
  ];
};

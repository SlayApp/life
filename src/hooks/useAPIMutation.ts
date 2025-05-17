import {
  MutateFunction,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useCallback} from 'react';

import {TExtendedMethod} from '~/types/TExtendedMethod';
import {log} from '~/utils/log.util';

import {onApiError} from './useOnApiError';

type TMutationOptions<T, TVariables> = UseMutationOptions<
  T,
  AxiosError,
  TVariables,
  unknown
>;

/**
 * Use this for api calls that mutate data [POST | PATCH] instead of useLazyAPIRequestV2 since that is for getting data
 * @param method api-client method
 * @returns
 */
export const useAPIMutation = <
  T extends TExtendedMethod,
  Response extends ReturnType<T>,
>(
  method: T,
  options?: TMutationOptions<Awaited<Response>['data'], Parameters<T>>,
) => {
  const fetcher: MutateFunction<
    Awaited<Response>['data'],
    AxiosError,
    Parameters<T>
  > = useCallback(
    async variables => {
      log.info(`[api] - Mutation ran: ${method.getKeyName()}`, ...variables);

      return (await method(...variables))?.data;
    },
    [method],
  );

  const onError = useCallback(
    (error: AxiosError) => {
      onApiError(error, 'Mutation', method.getKeyName());
    },
    [method],
  );

  const {mutate, ...rest} = useMutation<
    Awaited<Response>['data'],
    AxiosError,
    Parameters<T>
  >({
    ...options,
    mutationFn: fetcher,
    onError,
  });

  const onMutate = useCallback(
    async (...args: Parameters<T>) => {
      return new Promise<Awaited<Response>['data']>((resolve, reject) => {
        mutate(args, {
          onSuccess: data => resolve(data),
          onError: reject,
        });
      });
    },
    [mutate],
  );

  return [onMutate, rest] as [typeof onMutate, typeof rest];
};

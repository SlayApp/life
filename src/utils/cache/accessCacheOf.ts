import {InfiniteData} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {TExtendedMethod} from '~/types/TExtendedMethod';

import {filterNil} from '../filterNil';
import {getQueryKey} from '../getQueryKey';
import {queryClient} from './queryClient';

export type TUnwrapAxiosResponse<T> = T extends AxiosResponse<infer U> ? U : T;

/**
 * if 1 parameter is optional, it will remove all types in the Head<T> generic
 * but we also want to keep the optional type as undefined, since the args are they key of the cache
 *
 * `TNonOptionalsConvertToNull` will convert all optional types to null and remove the `?` optional
 * `TConvertNullToUndefined` will convert all null types to undefined  so they retain the type, since the cache helpers
 * will remove nil values
 */

type TNonOptionalsConvertToNull<T extends unknown[]> = {
  [K in keyof T]-?: undefined extends T[K] ? T[K] | null : T[K];
};
type TConvertNullToUndefined<T extends unknown[]> = {
  [K in keyof T]: null extends T[K] ? NonNullable<T[K]> | undefined : T[K];
};
export type TRequiredParams<T extends TExtendedMethod> =
  TConvertNullToUndefined<TNonOptionalsConvertToNull<Parameters<T>>>;
export type THead<T extends unknown[]> = T extends [...infer Head, unknown]
  ? Head
  : [];

export const getCacheOf =
  <
    T extends TExtendedMethod,
    Response extends Awaited<ReturnType<T>>,
    Value extends TUnwrapAxiosResponse<Response>,
  >(
    apiMethod: T,
  ) =>
  <TArgs extends THead<TRequiredParams<T>>>(
    ...params: TArgs
  ): Value | undefined => {
    return queryClient.getQueryData<Value>(
      getQueryKey([apiMethod.getKeyName(), ...filterNil(params)]),
    );
  };

export const setCacheOf =
  <
    T extends TExtendedMethod,
    Response extends Awaited<ReturnType<T>>,
    Value extends TUnwrapAxiosResponse<Response>,
  >(
    apiMethod: T,
  ) =>
  <TArgs extends THead<TRequiredParams<T>>>(
    value: Value,
    ...params: TArgs
  ): void => {
    const queryKey = getQueryKey([
      apiMethod.getKeyName(),
      ...filterNil(params),
    ]);
    queryClient.setQueryData<Value>(queryKey, value);
  };

// for paginated data, it is stored different than actual result
export const getInfiniteCacheOf =
  <
    T extends TExtendedMethod,
    Response extends Awaited<ReturnType<T>>,
    Value extends TUnwrapAxiosResponse<Response>,
  >(
    apiMethod: T,
  ) =>
  <TArgs extends THead<TRequiredParams<T>>>(
    ...params: TArgs
  ): InfiniteData<Value> | undefined => {
    return queryClient.getQueryData<InfiniteData<Value>>(
      getQueryKey([apiMethod.getKeyName(), ...filterNil(params)]),
    );
  };

export const setInfiniteCacheOf =
  <
    T extends TExtendedMethod,
    Response extends Awaited<ReturnType<T>>,
    Value extends TUnwrapAxiosResponse<Response>,
  >(
    apiMethod: T,
  ) =>
  <TArgs extends THead<TRequiredParams<T>>>(
    value: InfiniteData<Value>,
    ...params: TArgs
  ): void => {
    queryClient.setQueryData<InfiniteData<Value>>(
      getQueryKey([apiMethod.getKeyName(), ...filterNil(params)]),
      value,
    );
  };

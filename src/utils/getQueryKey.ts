type TFirstString = readonly [string, ...unknown[]];
export const getQueryKey = (queryKey: TFirstString) => {
  return queryKey;
};

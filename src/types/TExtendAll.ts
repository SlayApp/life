export type TExtendAll<T, U> = {
  [K in keyof T]: T[K] & U;
};

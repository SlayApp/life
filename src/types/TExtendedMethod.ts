// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TExtendedMethod = ((...args: any[]) => any) & {
  getKeyName: () => string;
};

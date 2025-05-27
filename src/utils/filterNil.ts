export const filterNil = <T>(arr: (T | null | undefined)[]): T[] => {
  'worklet';

  return arr.filter((x): x is T => x !== null && x !== undefined);
};

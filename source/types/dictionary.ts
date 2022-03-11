export type Dictionary<TValue, TKey extends string | symbol | number = string> = {
  [K in TKey]: TValue;
};

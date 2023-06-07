export type EmptyObject<T> = {
  [K in keyof T]: '';
};

export type TRequestError = { message: string; code: string };

export type TResponse<T> = {
  data: T | null;
};

export type TDeserializeReturn<T> = (response: TResponse<T>) => T;

export type TDeserializeArrayReturn<T> = (
  response: TResponse<Array<unknown>>
) => Array<T>;

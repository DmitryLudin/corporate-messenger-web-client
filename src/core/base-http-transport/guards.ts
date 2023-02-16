import type { TRequestError } from 'core/base-http-transport/types';

export function isRequestError(
  data: unknown | TRequestError
): data is TRequestError {
  const error = data as TRequestError;
  return error.message !== undefined && error.code !== undefined;
}

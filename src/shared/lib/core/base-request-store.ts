import { action } from 'mobx';
import { Store } from 'shared/lib/core/base-store';

type TRequestStore = {
  isLoading: boolean;
  error?: Error;
};

const initialRequestStore: TRequestStore = {
  isLoading: false,
};

export class RequestStore<T> extends Store<T & TRequestStore> {
  constructor(initialState: T) {
    super({ ...initialRequestStore, ...initialState });
  }

  @action
  setLoading(value: boolean) {
    this.state.isLoading = value;
  }

  @action
  setError = (error?: Error) => {
    this.state.error = error;
  };
}

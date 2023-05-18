import { Store } from 'core/base-store';
import { action } from 'mobx';

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

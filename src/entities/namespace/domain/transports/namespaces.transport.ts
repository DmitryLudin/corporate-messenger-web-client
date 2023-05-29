import { BaseHttpTransport } from 'shared/lib/core';

import { Namespace } from '../models';

export class NamespacesTransport extends BaseHttpTransport {
  constructor() {
    super('namespaces');
  }

  create(data: { name: string; displayName: string }) {
    return this.post(`${this.basePath}/create`, data).then(
      this.deserialize(Namespace)
    );
  }

  getAll() {
    return this.get(`${this.basePath}/me`).then(
      this.deserializeArray(Namespace)
    );
  }

  getByName(name: string) {
    return this.get(`${this.basePath}/${name}`).then(
      this.deserialize(Namespace)
    );
  }

  join(namespaceName: string) {
    return this.post(`${this.basePath}/join`, { namespaceName });
  }
}

export const namespaceTransport = new NamespacesTransport();

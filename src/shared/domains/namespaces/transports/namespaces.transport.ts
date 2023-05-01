import { BaseHttpTransport } from 'core/base-http-transport';
import { Namespace } from 'shared/domains/namespaces/models/namepsace.model';

export class NamespacesTransport extends BaseHttpTransport {
  constructor() {
    super('namespaces');
  }

  create(data: { name: string; displayName: string }) {
    return this.post(this.basePath, data).then(this.deserialize(Namespace));
  }

  getAll() {
    return this.get(this.basePath).then(this.deserializeArray(Namespace));
  }
}

export const namespaceTransport = new NamespacesTransport();

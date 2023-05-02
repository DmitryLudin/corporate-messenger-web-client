import { BaseWsTransport } from 'core/base-ws-transport';
import { NamespaceEventEnum } from 'shared/domains/namespaces/const/namespaces-event.enum';

type TNamespaceEventsMap = {
  [NamespaceEventEnum.NAMESPACE_CONNECT]: (namespaceId: string) => void;
};

export class NamespacesWsTransport extends BaseWsTransport<TNamespaceEventsMap> {
  constructor() {
    super('namespaces');
  }

  connectToNamespace(namespaceId: string) {
    this.send(NamespaceEventEnum.NAMESPACE_CONNECT, namespaceId);
  }
}

export const namespacesWsTransport = new NamespacesWsTransport();

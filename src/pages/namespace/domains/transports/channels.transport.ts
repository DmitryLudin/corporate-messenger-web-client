import { BaseHttpTransport } from 'core/base-http-transport';
import { Channel } from 'pages/namespace/domains/models/channel.model';

export class ChannelsTransport extends BaseHttpTransport {
  constructor() {
    super('channels');
  }

  getAllForUser(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}/self`).then(
      this.deserializeArray(Channel)
    );
  }
}

export const channelsTransport = new ChannelsTransport();

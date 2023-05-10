import { BaseHttpTransport } from 'core/base-http-transport';
import { Channel } from 'pages/namespace/domains/channels/models/channel.model';
import { TCreateChannel } from 'pages/namespace/types/create-channel';

export class ChannelsTransport extends BaseHttpTransport {
  constructor() {
    super('channels');
  }

  getAllForUser(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}/self`).then(
      this.deserializeArray(Channel)
    );
  }

  create(namespaceId: string, data: TCreateChannel) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/create`,
      data
    ).then(this.deserialize(Channel));
  }
}

export const channelsTransport = new ChannelsTransport();

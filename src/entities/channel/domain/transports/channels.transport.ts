import { BaseHttpTransport } from 'shared/lib/core';

import { TCreateChannelDto } from '../dto';
import { Channel, ChannelPagination } from '../models';

export class ChannelsTransport extends BaseHttpTransport {
  constructor() {
    super('channels');
  }

  getByName(namespaceId: string, channelName: string) {
    return this.get(`namespaces/${namespaceId}/channels/${channelName}`).then(
      this.deserialize(Channel)
    );
  }

  getChannels(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}`, {
      limit: 30,
      page: 1,
    }).then(this.deserialize(ChannelPagination));
  }

  getSelf(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}/me`).then(
      this.deserializeArray(Channel)
    );
  }

  create(namespaceId: string, data: TCreateChannelDto) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/create`,
      data
    ).then(this.deserialize(Channel));
  }
}

export const channelsTransport = new ChannelsTransport();

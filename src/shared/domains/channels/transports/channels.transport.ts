import { BaseHttpTransport } from 'core/base-http-transport';
import { Channel } from 'shared/domains/channels/models/channel.model';
import { ChannelMembers } from 'shared/domains/channels/models/members.model';
import { TCreateChannel } from 'shared/domains/channels/types/create-channel';

export class ChannelsTransport extends BaseHttpTransport {
  constructor() {
    super('channels');
  }

  getAllForUser(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}/me`).then(
      this.deserializeArray(Channel)
    );
  }

  getByName(namespaceId: string, channelName: string) {
    return this.get(`namespaces/${namespaceId}/channels/${channelName}`).then(
      this.deserialize(Channel)
    );
  }

  getChannelMembers(namespaceId: string, channelId: string, params?: object) {
    return this.get(
      `namespaces/${namespaceId}/channels/${channelId}/members`,
      params
    ).then(this.deserialize(ChannelMembers));
  }

  create(namespaceId: string, data: TCreateChannel) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/create`,
      data
    ).then(this.deserialize(Channel));
  }
}

export const channelsTransport = new ChannelsTransport();

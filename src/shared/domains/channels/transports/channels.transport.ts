import { BaseHttpTransport } from 'core/base-http-transport';
import { TCreateChannel } from 'pages/namespace/types/create-channel';
import { Channel } from 'shared/domains/channels/models/channel.model';
import { Members } from 'shared/domains/channels/models/members.model';
import { User } from 'shared/domains/user/user.model';

export class ChannelsTransport extends BaseHttpTransport {
  constructor() {
    super('channels');
  }

  getAllForUser(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}/self`).then(
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
    ).then(this.deserialize(Members));
  }

  create(namespaceId: string, data: TCreateChannel) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/create`,
      data
    ).then(this.deserialize(Channel));
  }
}

export const channelsTransport = new ChannelsTransport();

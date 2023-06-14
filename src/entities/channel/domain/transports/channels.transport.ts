import { BaseHttpTransport } from 'shared/lib/core';

import type {
  TCreateChannelDto,
  TJoinChannelDto,
  TLeaveChannelDto,
} from '../dto';
import {
  Channel,
  ChannelMessagePaginationModel,
  ChannelPagination,
} from '../models';

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

  join(namespaceId: string, channelId: string, data: TJoinChannelDto) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/${channelId}/members/add`,
      data
    ).then(this.deserialize(Channel));
  }

  leave(namespaceId: string, channelId: string, data: TLeaveChannelDto) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/${channelId}/members/remove`,
      data
    ).then(this.deserialize(Channel));
  }

  create(namespaceId: string, data: TCreateChannelDto) {
    return this.post(
      `namespaces/${namespaceId}/${this.basePath}/create`,
      data
    ).then(this.deserialize(Channel));
  }

  getMessages(namespaceId: string, channelId: string) {
    return this.get(
      `namespaces/${namespaceId}/${this.basePath}/${channelId}/messages`
    ).then(this.deserialize(ChannelMessagePaginationModel));
  }
}

export const channelsTransport = new ChannelsTransport();

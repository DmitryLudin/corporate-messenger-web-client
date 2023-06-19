import { BaseWsTransport } from 'shared/lib/core';

import { ChannelsEventEnum } from '../const';
import { IUnreadChannelTimestampDto, TCreateMessageDto } from '../dto';
import { ChannelMessageModel } from '../models';

type TChannelsEventsMap = {
  [ChannelsEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
  [ChannelsEventEnum.MEMBERS_COUNT]: (data: {
    channelId: string;
    membersCount: number;
  }) => void;
  [ChannelsEventEnum.SEND_MESSAGE]: (data: TCreateMessageDto) => void;
  [ChannelsEventEnum.NEW_MESSAGE]: (data: ChannelMessageModel) => void;
  [ChannelsEventEnum.UNREAD]: (data: {
    channelId: string;
    isUnread: boolean;
    lastReadTimestamp: number;
  }) => void;
  [ChannelsEventEnum.UNREAD_TIMESTAMP]: (
    data: IUnreadChannelTimestampDto
  ) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelsEventEnum.JOIN_CHANNELS, namespaceId);
  }

  sendChannelMessage(data: TCreateMessageDto) {
    this.send(ChannelsEventEnum.SEND_MESSAGE, data);
  }

  sendChannelViewed(data: IUnreadChannelTimestampDto) {
    this.send(ChannelsEventEnum.UNREAD_TIMESTAMP, data);
  }

  listenChannelNewMessage(
    callback: TChannelsEventsMap[ChannelsEventEnum.NEW_MESSAGE]
  ) {
    this.listen(
      ChannelsEventEnum.NEW_MESSAGE,
      this.deserialize(ChannelMessageModel, callback)
    );
  }

  listenNewChannelMembersCount(
    callback: TChannelsEventsMap[ChannelsEventEnum.MEMBERS_COUNT]
  ) {
    this.listen(ChannelsEventEnum.MEMBERS_COUNT, callback);
  }

  listenUnreadChannel(callback: TChannelsEventsMap[ChannelsEventEnum.UNREAD]) {
    this.listen(ChannelsEventEnum.UNREAD, callback);
  }
}

export const channelsWsTransport = new ChannelsWsTransport();

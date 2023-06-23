import { BaseWsTransport } from 'shared/lib/core';

import { ChannelsEventEnum } from '../const';
import {
  IUnreadChannelTimestampDto,
  TCreateMessageDto,
  TRemoveChannelMessageDto,
  TUpdateMessageDto,
} from '../dto';
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
  [ChannelsEventEnum.UPDATE_MESSAGE]: (data: TUpdateMessageDto) => void;
  [ChannelsEventEnum.MESSAGE_UPDATED]: (data: ChannelMessageModel) => void;
  [ChannelsEventEnum.REMOVE_MESSAGE]: (data: TRemoveChannelMessageDto) => void;
  [ChannelsEventEnum.MESSAGE_REMOVED]: (data: TRemoveChannelMessageDto) => void;
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

  sendUpdateMessage(data: TUpdateMessageDto) {
    this.send(ChannelsEventEnum.UPDATE_MESSAGE, data);
  }

  sendRemoveMessage(data: TRemoveChannelMessageDto) {
    this.send(ChannelsEventEnum.REMOVE_MESSAGE, data);
  }

  listenChannelNewMessage(
    callback: TChannelsEventsMap[ChannelsEventEnum.NEW_MESSAGE]
  ) {
    this.listen(
      ChannelsEventEnum.NEW_MESSAGE,
      this.deserialize(ChannelMessageModel, callback)
    );
  }

  listenUpdatedMessage(
    callback: TChannelsEventsMap[ChannelsEventEnum.MESSAGE_UPDATED]
  ) {
    this.listen(
      ChannelsEventEnum.MESSAGE_UPDATED,
      this.deserialize(ChannelMessageModel, callback)
    );
  }

  listenRemovedMessage(
    callback: TChannelsEventsMap[ChannelsEventEnum.MESSAGE_REMOVED]
  ) {
    this.listen(ChannelsEventEnum.MESSAGE_REMOVED, callback);
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

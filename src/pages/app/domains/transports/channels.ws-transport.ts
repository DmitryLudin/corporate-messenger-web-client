import { BaseWsTransport } from 'core/base-ws-transport';
import { ChannelEventEnum } from 'pages/app/domains/const/channel-event.enum';

type TChannelsEventsMap = {
  [ChannelEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelEventEnum.JOIN_CHANNELS, namespaceId);
  }
}

export const channelsWsTransport = new ChannelsWsTransport();

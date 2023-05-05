import { BaseWsTransport } from 'core/base-ws-transport';
import { ChannelsEventEnum } from 'pages/namespace/domains/const/channel-event.enum';

type TChannelsEventsMap = {
  [ChannelsEventEnum.JOIN_CHANNELS]: (namespaceId: string) => void;
};

export class ChannelsWsTransport extends BaseWsTransport<TChannelsEventsMap> {
  constructor() {
    super('channels');
  }

  sendJoinChannels(namespaceId: string) {
    this.send(ChannelsEventEnum.JOIN_CHANNELS, namespaceId);
  }
}

export const channelsWsTransport = new ChannelsWsTransport();

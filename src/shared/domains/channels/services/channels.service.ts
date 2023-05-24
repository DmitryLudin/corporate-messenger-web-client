import { Channel } from 'shared/domains/channels/models/channel.model';
import {
  channelsTransport,
  ChannelsTransport,
} from 'shared/domains/channels/transports/channels.transport';
import {
  channelsWsTransport,
  ChannelsWsTransport,
} from 'shared/domains/channels/transports/channels.ws-transport';
import {
  namespacesService,
  NamespacesService,
} from 'shared/domains/namespaces/namespaces.service';
import { RequestStore } from 'shared/lib/core/base-request-store';

export class ChannelsService {
  private readonly _selectedChannelsStore = new RequestStore<{
    channel: Channel | null;
  }>({ channel: null });

  get selectedChannelsStore() {
    return this._selectedChannelsStore.getStore();
  }

  constructor(
    private readonly transport: ChannelsTransport,
    private readonly wsTransport: ChannelsWsTransport,
    private readonly namespacesService: NamespacesService
  ) {}

  async getByName(channelName: string) {
    try {
      this._selectedChannelsStore.setLoading(true);
      const namespaceId = this.namespacesService.getSelectedNamespaceId();
      const channel = await this.transport.getByName(namespaceId, channelName);
      this._selectedChannelsStore.updateStore({ channel });
    } catch (error) {
      this._selectedChannelsStore.setError(error as Error);
    } finally {
      this._selectedChannelsStore.setLoading(false);
    }
  }

  connect(namespaceId: string) {
    this.wsTransport.connect();
    this.wsTransport.sendJoinChannels(namespaceId);
    // this.wsTransport.listenNewChannelMembers(({ users, channelId }) => {
    //   const { members, channel } = this._selectedChannelsStore.getStore();
    //
    //   if (!members || channelId !== channel?.id) return;
    //
    //   members.items.push(...users);
    //   console.log(members);
    //   this._selectedChannelsStore.updateStoreValue('members', members);
    // });
  }

  disconnect() {
    this.wsTransport.disconnect();
  }

  resetStore() {
    this._selectedChannelsStore.resetStore();
  }
}

export const channelsService = new ChannelsService(
  channelsTransport,
  channelsWsTransport,
  namespacesService
);

import { BrowseChannelPagination } from 'pages/browse-channels/domains/browse-channels/models/pagination.model';
import { ChannelsTransport } from 'shared/domains/channels/transports/channels.transport';

export class BrowseChannelsTransport extends ChannelsTransport {
  getAll(namespaceId: string) {
    return this.get(`namespaces/${namespaceId}/${this.basePath}`).then(
      this.deserialize(BrowseChannelPagination)
    );
  }
}

export const browseChannelsTransport = new BrowseChannelsTransport();

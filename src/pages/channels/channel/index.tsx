import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectedChannelService } from 'entities/channel';
import { namespacesService } from 'shared/domains/namespace';
import { withObserver } from 'shared/lib/hoc';
import { NamespaceContentLayout } from 'entities/namespace';
import { ChannelFooter } from 'widgets/channels/channel-footer';
import { ChannelHeader } from 'widgets/channels/channel-header';
import { ChannelMessageList } from 'widgets/channels/channel-message-list';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const { isLoading, selectedChannelId } = selectedChannelService.store;
  const { isLoading: isMessagesLoading } =
    selectedChannelService.channelMessagesStore;
  const namespace = namespacesService.selectedNamespaceStore.namespace;

  useEffect(() => {
    if (params.channel && namespace?.id) {
      selectedChannelService.fetchByName(namespace.id, params.channel);

      return () => {
        selectedChannelService.resetStore();
      };
    }
  }, [params.channel, namespace?.id]);

  useEffect(() => {
    if (selectedChannelId && namespace?.id) {
      selectedChannelService.fetchMessages(namespace.id, selectedChannelId);
    }
  }, [selectedChannelId, namespace?.id]);

  return (
    <NamespaceContentLayout
      isLoading={isLoading || isMessagesLoading}
      header={<ChannelHeader />}
      footer={<ChannelFooter />}
    >
      <ChannelMessageList />
    </NamespaceContentLayout>
  );
}

export const ChannelPage = withObserver(ChannelPageMemo);

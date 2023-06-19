import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { selectedChannelService } from 'entities/channel';
import { namespacesService } from 'shared/domains/namespace';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { NamespaceContentLayout } from 'entities/namespace';
import { ChannelFooter } from 'widgets/channels/channel-footer';
import { ChannelHeader } from 'widgets/channels/channel-header';
import { ChannelMessageList } from 'widgets/channels/channel-message-list';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const [messagesIsLoading, setLoading] = useState(false);
  const { isLoading, selectedChannelId } = selectedChannelService.store;
  const namespace = namespacesService.selectedNamespaceStore.namespace;
  const user = userService.store.user;

  useEffect(() => {
    if (params.channel && namespace?.id) {
      selectedChannelService.fetchByName(namespace.id, params.channel);
    }
  }, [params.channel, namespace?.id]);

  useEffect(() => {
    if (selectedChannelId && namespace?.id) {
      setLoading(true);
      selectedChannelService
        .fetchMessages(namespace.id, selectedChannelId)
        .catch()
        .finally(() => setLoading(false));
    }
  }, [selectedChannelId, namespace?.id]);

  useEffect(() => {
    if (user?.id && selectedChannelId && !messagesIsLoading) {
      selectedChannelService.sendChannelViewed({
        channelId: selectedChannelId,
        timestamp: Date.now(),
        userId: user?.id,
      });
    }
  }, [user?.id, selectedChannelId, messagesIsLoading]);

  return (
    <NamespaceContentLayout
      isLoading={isLoading || messagesIsLoading}
      header={<ChannelHeader />}
      footer={<ChannelFooter />}
    >
      <ChannelMessageList />
    </NamespaceContentLayout>
  );
}

export const ChannelPage = withObserver(ChannelPageMemo);

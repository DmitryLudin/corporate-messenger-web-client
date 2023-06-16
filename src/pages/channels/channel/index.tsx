import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { NamespaceContentLayout } from 'entities/namespace';
import { ChannelFooter } from 'widgets/channels/channel-footer';
import { ChannelHeader } from 'widgets/channels/channel-header';
import { ChannelMessageList } from 'widgets/channels/channel-message-list';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const [messagesIsLoading, setLoading] = useState(false);
  const { isLoading } = selectedChannelService.store;

  useEffect(() => {
    if (params.channel) {
      selectedChannelService.fetchByName(params.channel);
    }
  }, [params.channel]);

  useEffect(() => {
    setLoading(true);
    selectedChannelService
      .fetchMessages()
      .catch()
      .finally(() => setLoading(false));
  }, []);

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

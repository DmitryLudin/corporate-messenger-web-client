import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { NamespaceContentLayout } from 'shared/ui/layouts/namespace-content-layout';
import { ChannelContent, ChannelFooter, ChannelHeader } from 'widgets/channel';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const { isLoading } = selectedChannelService.store;

  useEffect(() => {
    if (params.channel) {
      selectedChannelService.fetchByName(params.channel);
    }
  }, [params.channel]);

  return (
    <NamespaceContentLayout
      isLoading={isLoading}
      header={<ChannelHeader />}
      footer={<ChannelFooter />}
    >
      <ChannelContent />
    </NamespaceContentLayout>
  );
}

export const ChannelPage = withObserver(ChannelPageMemo);

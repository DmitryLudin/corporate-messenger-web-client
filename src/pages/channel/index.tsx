import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { Layout } from 'shared/ui/layout';
import { ChannelContent, ChannelFooter, ChannelHeader } from 'widgets/channel';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const { isLoading } = channelsService.selectedChannelsStore;

  useEffect(() => {
    if (params.channel) {
      channelsService.getByName(params.channel);
    }
  }, [params.channel]);

  return (
    <Layout
      isLoading={isLoading}
      header={<ChannelHeader />}
      footer={<ChannelFooter />}
    >
      <ChannelContent />
    </Layout>
  );
}

export const ChannelPage = withObserver(ChannelPageMemo);

import { ChannelContent } from 'pages/channel/content';
import { ChannelFooter } from 'pages/channel/footer';
import { ChannelHeader } from 'pages/channel/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from 'shared/components/layout';
import { channelsService } from 'shared/domains/channels';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function ChannelPageMemo() {
  const params = useParams<{ channel: string }>();
  const { isLoading } = channelsService.selectedChannelsStore;

  useEffect(() => {
    if (params.channel) {
      channelsService.getByName(params.channel);
    }
  }, [params.channel]);

  useEffect(() => {
    return () => channelsService.resetStore();
  }, []);

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

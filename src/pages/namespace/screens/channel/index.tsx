import { ScreenLayout } from 'pages/namespace/components/screen-layout/layout';
import { ChannelContent } from 'pages/namespace/screens/channel/content';
import { ChannelFooter } from 'pages/namespace/screens/channel/footer';
import { ChannelHeader } from 'pages/namespace/screens/channel/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { channelsService } from 'shared/domains/channels';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function ChannelScreenMemo() {
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
    <ScreenLayout
      isLoading={isLoading}
      header={<ChannelHeader />}
      footer={<ChannelFooter />}
    >
      <ChannelContent />
    </ScreenLayout>
  );
}

export const ChannelScreen = withObserver(ChannelScreenMemo);

import { withObserver } from 'hoc/with-observer.hoc';
import { ScreenLayout } from 'pages/namespace/components/screen-layout/layout';
import { ChannelContent } from 'pages/namespace/screens/channel/modules/content';
import { ChannelFooter } from 'pages/namespace/screens/channel/modules/footer';
import { ChannelHeader } from 'pages/namespace/screens/channel/modules/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { channelsService } from 'shared/domains/channels/channels.service';

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

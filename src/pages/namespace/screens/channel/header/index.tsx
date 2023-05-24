import { Box } from '@mui/joy';
import { ScreenHeader } from 'pages/namespace/components/screen-header/header';
import { ChannelQuickActions } from 'pages/namespace/screens/channel/header/channel-quick-actions';
import { PoundIcon } from 'shared/components/icons/pound';
import { channelsService } from 'shared/domains/channels';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function ChannelHeaderMemo() {
  const channel = channelsService.selectedChannelsStore.channel;

  return (
    <ScreenHeader
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PoundIcon /> {channel?.getName()}
        </Box>
      }
      description={channel?.description}
      endActions={<ChannelQuickActions />}
    />
  );
}

export const ChannelHeader = withObserver(ChannelHeaderMemo);

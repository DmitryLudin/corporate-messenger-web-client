import { Box } from '@mui/joy';
import { ChannelQuickActions } from 'pages/channel/header/channel-quick-actions';
import { PoundIcon } from 'shared/components/icons/pound';
import { PageHeader } from 'shared/components/page-header';
import { channelsService } from 'shared/domains/channels';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function ChannelHeaderMemo() {
  const channel = channelsService.selectedChannelsStore.channel;

  return (
    <PageHeader
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

import { Box } from '@mui/joy';
import { PoundIcon } from 'components/icons/pound';
import { withObserver } from 'hoc/with-observer.hoc';
import { ScreenHeader } from 'pages/namespace/components/screen-header/header';
import { ChannelQuickActions } from 'pages/namespace/screens/channel/modules/header/channel-quick-actions';
import React from 'react';
import { channelsService } from 'shared/domains/channels/channels.service';

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

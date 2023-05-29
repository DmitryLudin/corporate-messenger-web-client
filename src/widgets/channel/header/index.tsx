import { Box } from '@mui/joy';

import { channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { PoundIcon } from 'shared/ui/icons';
import { PageHeader } from 'shared/ui/page-header';

import { ChannelQuickActions } from './ui';

function ChannelHeaderMemo() {
  const channel = channelsService.getSelectedChannel();

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

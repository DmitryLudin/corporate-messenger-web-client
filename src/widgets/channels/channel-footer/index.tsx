import { Box } from '@mui/joy';

import { selectedChannelService } from 'entities/channel';
import { ChannelEditor } from 'features/channels/channel-editor';
import { withObserver } from 'shared/lib/hoc';

import { UserNotJoinedChannel } from './ui';

function ChannelFooterMemo() {
  const channel = selectedChannelService.selectedChannel;

  return (
    <>
      {channel?.isMember ? (
        <Box sx={{ px: 2, pb: 2 }}>
          <ChannelEditor />
        </Box>
      ) : (
        <UserNotJoinedChannel />
      )}
    </>
  );
}

export const ChannelFooter = withObserver(ChannelFooterMemo);

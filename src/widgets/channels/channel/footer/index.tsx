import { Box } from '@mui/joy';

import { ChannelEditor, selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

import { UserNotJoinedChannel } from './user-not-joined';

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

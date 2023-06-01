import { Box } from '@mui/joy';

import { selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

import { ChannelTextEditor } from './text-editor';
import { UserNotJoinedChannel } from './user-not-joined';

function ChannelFooterMemo() {
  const channel = selectedChannelService.selectedChannel;

  return (
    <>
      {channel?.isMember ? (
        <Box sx={{ p: 2 }}>
          <ChannelTextEditor />
        </Box>
      ) : (
        <UserNotJoinedChannel />
      )}
    </>
  );
}

export const ChannelFooter = withObserver(ChannelFooterMemo);

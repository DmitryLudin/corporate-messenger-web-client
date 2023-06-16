import { Box, Typography } from '@mui/joy';
import { Virtuoso } from 'react-virtuoso';

import { selectedChannelService } from 'entities/channel';
import { ChannelMessage } from 'features/channels/channel-message';
import { withObserver } from 'shared/lib/hoc';

function ChannelMessageListMemo() {
  const messageIds = selectedChannelService.store.messageIds;

  return (
    <Box sx={{ height: '100%' }}>
      {!messageIds ? (
        <Typography>Сообщений канала нет</Typography>
      ) : (
        <Virtuoso
          style={{ height: '100%' }}
          data={messageIds}
          itemContent={(index, messageId) => (
            <ChannelMessage key={messageId} messageId={messageId} />
          )}
        />
      )}
    </Box>
  );
}

export const ChannelMessageList = withObserver(ChannelMessageListMemo);

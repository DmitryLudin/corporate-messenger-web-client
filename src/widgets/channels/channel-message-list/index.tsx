import { Box, Typography } from '@mui/joy';
import { Virtuoso } from 'react-virtuoso';

import { ChannelMessage, selectedChannelService } from 'entities/channel';

export function ChannelMessageList() {
  const messages = selectedChannelService.channelMessages;

  return (
    <Box sx={{ height: '100%' }}>
      {!messages ? (
        <Typography>Сообщений канала нет</Typography>
      ) : (
        <Virtuoso
          style={{ height: '100%' }}
          data={messages}
          itemContent={(index, message) => (
            <ChannelMessage key={message.id} {...message} />
          )}
        />
      )}
    </Box>
  );
}

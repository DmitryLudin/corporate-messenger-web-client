import { Box, CircularProgress, Grid, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { ChannelMessage, selectedChannelService } from 'entities/channel';

export function ChannelContent() {
  const [isLoading, setLoading] = useState(false);
  const messages = selectedChannelService.channelMessages;

  useEffect(() => {
    setLoading(true);
    selectedChannelService
      .fetchMessages()
      .catch()
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Grid sx={{ mt: 3 }} container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

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

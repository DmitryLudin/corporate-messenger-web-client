import { Box, Typography } from '@mui/joy';
import { Fragment } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { selectedChannelService } from 'entities/channel';
import { ChannelMessage } from 'features/channels/channel-message';
import { withObserver } from 'shared/lib/hoc';

import { NewMessagesSeparator } from './ui';

function ChannelMessageListMemo() {
  const messageIds = selectedChannelService.store.messageIds;

  return (
    <Box sx={{ height: '100%' }}>
      {!messageIds?.length ? (
        <Typography sx={{ p: 1.5 }}>Сообщений канала нет</Typography>
      ) : (
        <Virtuoso
          style={{ height: '100%' }}
          data={messageIds}
          itemContent={(index, messageId) => (
            <Fragment key={messageId}>
              {/*<NewMessagesSeparator*/}
              {/*  prevMessageId={messageIds[index - 1]}*/}
              {/*  messageId={messageId}*/}
              {/*/>*/}
              <ChannelMessage messageId={messageId} />
            </Fragment>
          )}
        />
      )}
    </Box>
  );
}

export const ChannelMessageList = withObserver(ChannelMessageListMemo);

import { Box, Typography } from '@mui/joy';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Virtuoso } from 'react-virtuoso';

import { selectedChannelService } from 'entities/channel';
import { ChannelMessage } from 'features/channels/channel-message';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';

import { NewMessagesSeparator } from './ui';

function ChannelMessageListMemo() {
  const { ref, inView } = useInView();
  const { isLoading, selectedChannelId } = selectedChannelService.store;
  const { messageIds } = selectedChannelService.channelMessagesStore;
  const user = userService.store.user;

  useEffect(() => {
    if (inView && user?.id && selectedChannelId && !isLoading) {
      selectedChannelService.sendChannelViewed({
        channelId: selectedChannelId,
        timestamp: Date.now(),
        userId: user?.id,
      });
    }
  }, [inView, isLoading, user?.id, selectedChannelId, messageIds.length]);

  return (
    <Box sx={{ height: '100%' }} ref={ref}>
      {!messageIds.length ? (
        <Typography sx={{ p: 1.5 }}>Сообщений канала нет</Typography>
      ) : (
        <Virtuoso
          style={{ height: '100%' }}
          data={messageIds}
          initialTopMostItemIndex={999}
          followOutput="auto"
          itemContent={(index, messageId) => (
            <div key={messageId}>
              <NewMessagesSeparator
                prevMessageId={messageIds[index - 1]}
                messageId={messageId}
              />
              <ChannelMessage messageId={messageId} />
            </div>
          )}
        />
      )}
    </Box>
  );
}

export const ChannelMessageList = withObserver(ChannelMessageListMemo);

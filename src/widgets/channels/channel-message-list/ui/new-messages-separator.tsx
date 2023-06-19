import { Chip, Divider } from '@mui/joy';
import dayjs from 'dayjs';

import { withObserver } from 'shared/lib/hoc';
import { selectedChannelService } from 'entities/channel';

function NewMessagesSeparatorMemo({
  messageId,
  prevMessageId,
}: {
  messageId: string;
  prevMessageId: string | undefined;
}) {
  const channel = selectedChannelService.selectedChannel;
  const prevMessage = selectedChannelService.getChannelMessage(
    prevMessageId || ''
  );
  const message = selectedChannelService.getChannelMessage(messageId);
  const lastReadAt = dayjs(Number(channel?.lastReadTimestamp));
  const isShowingBefore = dayjs(prevMessage?.createdAt).isAfter(lastReadAt);
  const isShow = dayjs(message?.createdAt).isAfter(lastReadAt);

  console.log(isShowingBefore, prevMessageId, isShow);

  if (!isShowingBefore || !prevMessageId) return null;

  return (
    <Divider
      sx={(theme) => ({
        my: 1,
      })}
    >
      <Chip variant="soft" color="warning" size="sm">
        Новые сообщения
      </Chip>
    </Divider>
  );
}

export const NewMessagesSeparator = withObserver(NewMessagesSeparatorMemo);

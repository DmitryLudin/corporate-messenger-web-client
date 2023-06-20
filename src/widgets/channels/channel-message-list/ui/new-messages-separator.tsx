import { Chip, Divider } from '@mui/joy';
import dayjs from 'dayjs';
import { userService } from 'shared/domains/user';

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
  const user = userService.store.user;
  const message = selectedChannelService.getChannelMessage(messageId);
  const lastReadAt = dayjs(Number(channel?.lastReadTimestamp));
  const prevMessageCreateAt = prevMessage && dayjs(prevMessage?.createdAt);
  const messageCreateAt = dayjs(message?.createdAt);

  if (
    user?.id !== message?.user.id &&
    messageCreateAt.isSameOrAfter(lastReadAt) &&
    (!prevMessageCreateAt || prevMessageCreateAt.isBefore(lastReadAt))
  ) {
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

  return null;
}

export const NewMessagesSeparator = withObserver(NewMessagesSeparatorMemo);

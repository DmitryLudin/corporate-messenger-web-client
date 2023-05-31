import { Button } from '@mui/joy';
import type { ButtonProps } from '@mui/joy';
import { useCallback, useState } from 'react';

import { channelsService } from 'entities/channel';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';

type TProps = {
  channelId: string;
  buttonText?: string;
  buttonProps?: Partial<ButtonProps>;
};

function JoinChannelButtonMemo({
  channelId,
  buttonText = 'Присоединиться',
  buttonProps = {},
}: TProps) {
  const [isLoading, setLoading] = useState(false);
  const user = userService.store.user;

  const handleClick = useCallback(async () => {
    if (user?.id) {
      setLoading(true);
      await channelsService.joinChannel(channelId, { userIds: [user.id] });
      setLoading(false);
    }
  }, [channelId, user?.id]);

  return (
    <Button
      loading={isLoading}
      onClick={handleClick}
      size="sm"
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}

export const JoinChannelButton = withObserver(JoinChannelButtonMemo);

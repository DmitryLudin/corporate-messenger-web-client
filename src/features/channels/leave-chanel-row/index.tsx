import { CircularProgress, ListItemDecorator, MenuItem } from '@mui/joy';
import { channelsService } from 'entities/channel';
import { useCallback, useState } from 'react';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';

type TProps = {
  channelId: string;
};

function LeaveChanelRowMemo({ channelId }: TProps) {
  const [isLoading, setLoading] = useState(false);
  const user = userService.store.user;

  const handleLeave = useCallback(async () => {
    if (user?.id) {
      setLoading(true);
      await channelsService.leaveChannel(channelId, { userId: user.id });
      setLoading(false);
    }
  }, [channelId, user?.id]);

  return (
    <MenuItem onClick={handleLeave} variant="soft" color="danger">
      Покинуть канал
      {isLoading && (
        <ListItemDecorator sx={{ ml: 'auto' }}>
          <CircularProgress size="sm" />
        </ListItemDecorator>
      )}
    </MenuItem>
  );
}

export const LeaveChanelRow = withObserver(LeaveChanelRowMemo);

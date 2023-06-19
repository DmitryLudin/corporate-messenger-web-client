import { CircularProgress, ListItemDecorator, MenuItem } from '@mui/joy';
import { channelsService } from 'entities/channel';
import { useCallback, useState } from 'react';
import { namespacesService } from 'shared/domains/namespace';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';

type TProps = {
  channelId: string;
  onClick?: VoidFunction;
};

function LeaveChanelRowMemo({ channelId, onClick }: TProps) {
  const [isLoading, setLoading] = useState(false);
  const user = userService.store.user;
  const namespace = namespacesService.selectedNamespaceStore.namespace;

  const handleLeave = useCallback(async () => {
    if (user?.id && namespace?.id) {
      setLoading(true);
      await channelsService.leaveChannel(namespace.id, channelId, {
        userId: user.id,
      });
      setLoading(false);
      onClick && onClick();
    }
  }, [channelId, onClick, user?.id, namespace?.id]);

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

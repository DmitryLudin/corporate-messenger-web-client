import { Box, Link } from '@mui/joy';
import { Link as RouterLink } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { useNamespaceNavigate } from 'shared/lib/hooks';
import { selectedChannelService } from 'entities/channel';
import { JoinChannelButton } from 'features/channels';

function UserNotJoinedChannelMemo() {
  const channel = selectedChannelService.selectedChannel;
  const { namespaceUrl } = useNamespaceNavigate();

  if (!channel) return null;

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <JoinChannelButton
        channelId={channel?.id}
        buttonProps={{ size: 'md' }}
        buttonText="Присоединиться к каналу"
      />
      <Link
        component={RouterLink}
        to={`${namespaceUrl}/browse-channels`}
        level="body2"
        color="neutral"
      >
        Вернуться ко всем каналам
      </Link>
    </Box>
  );
}

export const UserNotJoinedChannel = withObserver(UserNotJoinedChannelMemo);

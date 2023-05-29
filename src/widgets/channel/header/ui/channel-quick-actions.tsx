import { Button, IconButton, Stack } from '@mui/joy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ChannelMembersCount, channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

function ChannelQuickActionsMemo() {
  const channel = channelsService.getSelectedChannel();

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {channel?.membersCount && (
        <Button
          size="sm"
          color="neutral"
          variant="plain"
          // onClick={onClick}
        >
          <ChannelMembersCount count={channel.membersCount} />
        </Button>
      )}
      <IconButton
        size="sm"
        color="neutral"
        variant="plain"
        // onClick={onClick}
      >
        <MoreHorizIcon />
      </IconButton>
    </Stack>
  );
}

export const ChannelQuickActions = withObserver(ChannelQuickActionsMemo);

import { Button, IconButton, Stack } from '@mui/joy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { withObserver } from 'hoc/with-observer.hoc';
import { channelsService } from 'shared/domains/channels/channels.service';

function ChannelQuickActionsMemo() {
  const channel = channelsService.selectedChannelsStore.channel;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {channel?.membersCount && (
        <Button
          size="sm"
          color="neutral"
          variant="plain"
          startDecorator={<PeopleAltIcon />}
          // onClick={onClick}
        >
          {channel.membersCount}
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

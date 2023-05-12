import { Button, IconButton, Stack } from '@mui/joy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { withObserver } from 'hoc/with-observer.hoc';
import { channelsService } from 'shared/domains/channels/channels.service';

function ChannelQuickActionsMemo() {
  const members = channelsService.selectedChannelStore.members;

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {members && (
        <Button
          size="sm"
          color="neutral"
          variant="plain"
          startDecorator={<PeopleAltIcon />}
          // onClick={onClick}
        >
          {members.meta.totalItems}
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

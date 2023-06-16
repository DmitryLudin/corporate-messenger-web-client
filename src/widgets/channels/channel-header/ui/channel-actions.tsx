import { Button, IconButton, Stack } from '@mui/joy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ChannelMembersCount, selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { useMenu } from 'shared/lib/hooks';

import { ChannelQuickActionsMenu } from './channel-quick-actions-menu';

function ChannelQuickActionsMemo() {
  const channel = selectedChannelService.selectedChannel;
  const { isMenuOpen, onOpenMenu, onCloseMenu, anchorEl } = useMenu();

  if (!channel) {
    return null;
  }

  return (
    <>
      <ChannelQuickActionsMenu
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        anchorEl={anchorEl}
        channelId={channel?.id}
      />

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
        {channel.isMember && (
          <IconButton
            size="sm"
            color="neutral"
            variant="plain"
            onClick={onOpenMenu}
          >
            <MoreHorizIcon />
          </IconButton>
        )}
      </Stack>
    </>
  );
}

export const ChannelActions = withObserver(ChannelQuickActionsMemo);

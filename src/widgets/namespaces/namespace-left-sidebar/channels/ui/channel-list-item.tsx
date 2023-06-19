import { Tooltip } from '@mui/joy';

import { withObserver } from 'shared/lib/hoc';
import { useMenu, useToggle } from 'shared/lib/hooks';
import { PoundIcon } from 'shared/ui/icons';
import { MoreIconButton } from 'shared/ui/more-icon-button';
import { NavigationListItem } from 'shared/ui/navigation-list';
import { selfChannelsService } from 'entities/channel';

import { ChannelQuickActionsMenu } from './channel-quick-actions-menu';

type TProps = { channelId: string };

function SidebarChannelListItemMemo({ channelId }: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const { isMenuOpen, onOpenMenu, onCloseMenu, anchorEl } = useMenu();
  const channel = selfChannelsService.getChannelById(channelId);

  if (!channel) return null;

  return (
    <>
      <ChannelQuickActionsMenu
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        anchorEl={anchorEl}
        channelId={channelId}
      />

      <NavigationListItem
        to={`channels/${channel.name}`}
        label={channel.getName()}
        icon={<PoundIcon />}
        isUnread={channel.isUnread}
        onMouseEnter={toggleHovered}
        onMouseLeave={toggleHovered}
        endAction={
          (isHovered || isMenuOpen) && (
            <Tooltip
              disableInteractive
              enterDelay={150}
              enterNextDelay={150}
              title="Настройка канала"
              size="sm"
              arrow
              placement="right"
            >
              <div>
                <MoreIconButton onClick={onOpenMenu} />
              </div>
            </Tooltip>
          )
        }
      />
    </>
  );
}

export const SidebarChannelListItem = withObserver(SidebarChannelListItemMemo);

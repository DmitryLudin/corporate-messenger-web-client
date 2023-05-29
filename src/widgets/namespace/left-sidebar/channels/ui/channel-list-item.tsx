import LockIcon from '@mui/icons-material/Lock';
import { Tooltip } from '@mui/joy';

import { useMenu, useToggle } from 'shared/lib/hooks';
import { PoundIcon } from 'shared/ui/icons';
import { MoreIconButton } from 'shared/ui/more-icon-button';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'shared/ui/navigation-list';

import { ChannelQuickActionsMenu } from './channel-quick-actions-menu';

type TProps = Omit<INavigationListItemProps, 'icon'> & {
  isPrivate?: boolean;
};

export function SidebarChannelListItem({
  to,
  isPrivate = false,
  label,
}: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const { isMenuOpen, onOpenMenu, onCloseMenu, anchorEl } = useMenu();

  return (
    <>
      <ChannelQuickActionsMenu
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        anchorEl={anchorEl}
      />

      <NavigationListItem
        to={to}
        label={label}
        icon={isPrivate ? <LockIcon fontSize="small" /> : <PoundIcon />}
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

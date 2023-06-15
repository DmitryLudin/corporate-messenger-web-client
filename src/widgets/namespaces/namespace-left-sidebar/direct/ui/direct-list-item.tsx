import { Tooltip } from '@mui/joy';

import { useMenu, useToggle } from 'shared/lib/hooks';
import { MoreIconButton } from 'shared/ui/more-icon-button';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'shared/ui/navigation-list';

import { DirectQuickActionsMenu } from './direct-quick-actions-menu';

type TProps = INavigationListItemProps;

export function DirectListItem({ to, icon, label }: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const { onOpenMenu, isMenuOpen, onCloseMenu, anchorEl } = useMenu();

  return (
    <>
      <DirectQuickActionsMenu
        isOpen={isMenuOpen}
        onClose={onCloseMenu}
        anchorEl={anchorEl}
      />

      <NavigationListItem
        to={to}
        label={label}
        icon={icon}
        onMouseEnter={toggleHovered}
        onMouseLeave={toggleHovered}
        endAction={
          (isHovered || isMenuOpen) && (
            <Tooltip
              arrow
              size="sm"
              enterDelay={150}
              placement="right"
              disableInteractive
              enterNextDelay={150}
              title="Настройка беседы"
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

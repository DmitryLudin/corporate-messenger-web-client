import { Tooltip } from '@mui/joy';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'modules/navigation/components/list-item';
import { NavigationMoreButton } from 'modules/navigation/components/more-menu-button';
import { useMoreButtonPopup } from 'modules/navigation/hooks/use-more-button-popup';
import { useToggle } from 'modules/navigation/hooks/use-toggle';
import { DirectPopup } from 'modules/navigation/modules/direct/components/popup';
import React from 'react';

type TProps = INavigationListItemProps;

export function DirectListItem({ to, icon, label }: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const { onOpenPopup, isPopupOpen, onClosePopup, anchorEl } =
    useMoreButtonPopup();

  return (
    <>
      <DirectPopup
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        anchorEl={anchorEl}
      />

      <NavigationListItem
        to={to}
        label={label}
        icon={icon}
        onMouseEnter={toggleHovered}
        onMouseLeave={toggleHovered}
        endAction={
          (isHovered || isPopupOpen) && (
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
                <NavigationMoreButton onClick={onOpenPopup} />
              </div>
            </Tooltip>
          )
        }
      />
    </>
  );
}

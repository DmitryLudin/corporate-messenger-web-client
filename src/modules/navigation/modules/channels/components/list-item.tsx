import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Tooltip } from '@mui/joy';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'modules/navigation/components/list-item';
import { NavigationMoreButton } from 'modules/navigation/components/more-menu-button';
import { usePopup } from 'modules/navigation/hooks/use-popup';
import { useToggle } from 'modules/navigation/hooks/use-toggle';
import { ChannelPopup } from 'modules/navigation/modules/channels/components/popup';
import React from 'react';

type TProps = Omit<INavigationListItemProps, 'icon'> & {
  isPrivate?: boolean;
  id: string | number;
};

export function ChannelListItem({ id, to, isPrivate = false, label }: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const {
    buttonLabel,
    popupLabel,
    onOpenPopup,
    isPopupOpen,
    onClosePopup,
    anchorEl,
  } = usePopup(id);

  return (
    <>
      <ChannelPopup
        buttonLabel={buttonLabel}
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        popupLabel={popupLabel}
        anchorEl={anchorEl}
      />

      <NavigationListItem
        to={to}
        label={label}
        icon={
          isPrivate ? (
            <LockIcon fontSize="small" />
          ) : (
            <LockOpenIcon fontSize="small" />
          )
        }
        onMouseEnter={toggleHovered}
        onMouseLeave={toggleHovered}
        endAction={
          (isHovered || isPopupOpen) && (
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
                <NavigationMoreButton
                  id={buttonLabel}
                  popupId={popupLabel}
                  onClick={onOpenPopup}
                  isPopupOpened={isPopupOpen}
                />
              </div>
            </Tooltip>
          )
        }
      />
    </>
  );
}

import { Tooltip } from '@mui/joy';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'modules/navigation/components/list-item';
import { NavigationMoreButton } from 'modules/navigation/components/more-menu-button';
import { usePopup } from 'modules/navigation/hooks/use-popup';
import { useToggle } from 'modules/navigation/hooks/use-toggle';
import { DirectPopup } from 'modules/navigation/modules/direct/components/popup';
import React from 'react';

type TProps = INavigationListItemProps & {
  id: string | number;
};

export function DirectListItem({ id, to, icon, label }: TProps) {
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
      <DirectPopup
        buttonLabel={buttonLabel}
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        popupLabel={popupLabel}
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

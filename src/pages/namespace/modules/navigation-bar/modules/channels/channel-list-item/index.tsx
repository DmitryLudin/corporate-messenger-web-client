import LockIcon from '@mui/icons-material/Lock';
import { Tooltip } from '@mui/joy';
import {
  INavigationListItemProps,
  NavigationListItem,
} from 'pages/namespace/modules/navigation-bar/components/list-item';
import { NavigationMoreButton } from 'pages/namespace/modules/navigation-bar/components/more-menu-button';
import { useMoreButtonPopup } from 'pages/namespace/modules/navigation-bar/hooks/use-more-button-popup';
import { ChannelPopup } from 'pages/namespace/modules/navigation-bar/modules/channels/channel-popup';
import { PoundIcon } from 'shared/components/icons/pound';
import { useToggle } from 'shared/lib/hooks/use-toggle';

type TProps = Omit<INavigationListItemProps, 'icon'> & {
  isPrivate?: boolean;
};

export function ChannelListItem({ to, isPrivate = false, label }: TProps) {
  const [isHovered, toggleHovered] = useToggle();
  const { onOpenPopup, isPopupOpen, onClosePopup, anchorEl } =
    useMoreButtonPopup();

  return (
    <>
      <ChannelPopup
        isOpen={isPopupOpen}
        onClose={onClosePopup}
        anchorEl={anchorEl}
      />

      <NavigationListItem
        to={to}
        label={label}
        icon={isPrivate ? <LockIcon fontSize="small" /> : <PoundIcon />}
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
                <NavigationMoreButton onClick={onOpenPopup} />
              </div>
            </Tooltip>
          )
        }
      />
    </>
  );
}

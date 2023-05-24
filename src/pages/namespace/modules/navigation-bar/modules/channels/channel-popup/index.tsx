import { ListDivider, Menu, MenuItem } from '@mui/joy';
import { TNavigationMoreMenuPopup } from 'pages/namespace/modules/navigation-bar/types/more-menu-button.types';

export function ChannelPopup({
  isOpen,
  onClose,
  anchorEl,
}: TNavigationMoreMenuPopup) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      size="sm"
      placement="top-start"
    >
      <MenuItem onClick={onClose}>Показать сведения о канале</MenuItem>
      <MenuItem onClick={onClose}>Отключить уведомления канала</MenuItem>
      <MenuItem onClick={onClose}>Добавить канал в избранное</MenuItem>
      <ListDivider />
      <MenuItem onClick={onClose} variant="soft" color="danger">
        Покинуть канал
      </MenuItem>
    </Menu>
  );
}

import { ListDivider, Menu, MenuItem } from '@mui/joy';
import type { TNavigationMoreMenuPopup } from 'modules/navigation/types/more-menu-button.types';
import React from 'react';

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

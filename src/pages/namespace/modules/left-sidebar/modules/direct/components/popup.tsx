import { ListDivider, Menu, MenuItem } from '@mui/joy';
import { TNavigationMoreMenuPopup } from 'pages/namespace/modules/left-sidebar/types/more-menu-button.types';
import React from 'react';

export function DirectPopup({
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
      <MenuItem onClick={onClose}>Показать сведения о беседе</MenuItem>
      <MenuItem onClick={onClose}>Отключить уведомления</MenuItem>
      <MenuItem onClick={onClose}>Добавить беседу в избранное</MenuItem>
      <ListDivider />
      <MenuItem onClick={onClose} variant="soft" color="danger">
        Закрыть беседу
      </MenuItem>
    </Menu>
  );
}

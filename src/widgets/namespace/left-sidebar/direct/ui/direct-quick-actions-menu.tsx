import { ListDivider, Menu, MenuItem } from '@mui/joy';

import { TMenuProps } from 'shared/lib/hooks';

export function DirectQuickActionsMenu({
  isOpen,
  onClose,
  anchorEl,
}: TMenuProps) {
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

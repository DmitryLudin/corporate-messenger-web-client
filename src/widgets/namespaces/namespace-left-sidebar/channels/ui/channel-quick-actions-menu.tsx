import { ListDivider, Menu, MenuItem } from '@mui/joy';

import type { TMenuProps } from 'shared/lib/hooks';
import { LeaveChanelRow } from 'features/channels/leave-chanel-row';

export function ChannelQuickActionsMenu({
  isOpen,
  onClose,
  anchorEl,
  channelId,
}: TMenuProps & { channelId: string }) {
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
      <LeaveChanelRow channelId={channelId} onClick={onClose} />
    </Menu>
  );
}

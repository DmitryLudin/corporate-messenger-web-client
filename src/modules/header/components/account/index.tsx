import { Avatar, Badge } from '@mui/joy';
import React from 'react';

export function Account() {
  return (
    <Badge
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="solid"
      badgeInset="14%"
      size="sm"
      color="success"
    >
      <Avatar
        variant="solid"
        alt="Лудин Дмитрий"
        src="/static/images/avatar/2.jpg"
        size="sm"
      />
    </Badge>
  );
}

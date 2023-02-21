import { Avatar, Badge } from '@mui/joy';
import { AvatarPropsSizeOverrides } from '@mui/joy/Avatar/AvatarProps';
import { OverridableStringUnion } from '@mui/types';
import React from 'react';

interface IProps {
  name: string;
  avatarUrl?: string;
  isOnline?: boolean;
  size?: OverridableStringUnion<
    'sm' | 'md' | 'lg' | 'xs',
    AvatarPropsSizeOverrides
  >;
}

export function UserAvatar({
  name,
  size = 'sm',
  avatarUrl,
  isOnline = false,
}: IProps) {
  return (
    <Badge
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant={isOnline ? 'solid' : 'outlined'}
      color={isOnline ? 'success' : 'neutral'}
      badgeInset="14%"
      size="sm"
    >
      <Avatar
        variant="solid"
        color="neutral"
        alt={name}
        src={avatarUrl || '/'}
        sx={
          size === 'xs'
            ? { '--Avatar-size': '24px', '--joy-fontSize-sm': '0.75rem' }
            : undefined
        }
        size={size !== 'xs' ? size : 'sm'}
      />
    </Badge>
  );
}

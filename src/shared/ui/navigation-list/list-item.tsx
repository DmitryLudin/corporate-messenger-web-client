import {
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import { memo, MouseEventHandler, JSX, cloneElement, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface INavigationListItemProps {
  label: string;
  icon: JSX.Element;
  to: string;
  isUnread?: boolean;
  endAction?: ReactNode;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export function NavigationListItemMemo({
  label,
  icon,
  endAction,
  to,
  isUnread = false,
  onMouseLeave,
  onMouseEnter,
}: INavigationListItemProps) {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  return (
    <ListItem
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      endAction={endAction}
    >
      <ListItemButton
        component={Link}
        to={to}
        selected={isUnread}
        variant={isActive ? 'soft' : 'plain'}
        color={isActive ? 'neutral' : undefined}
      >
        <ListItemDecorator>
          {cloneElement(icon, { color: isActive ? 'primary' : 'inherit' })}
        </ListItemDecorator>
        <ListItemContent>
          <Typography fontWeight={isUnread ? 700 : 400} fontSize="sm" noWrap>
            {label}
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

export const NavigationListItem = memo(NavigationListItemMemo);

import {
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import { memo, MouseEventHandler, ReactNode } from 'react';
import { Link, useMatch } from 'react-router-dom';

export interface INavigationListItemProps {
  label: string;
  icon: JSX.Element;
  to: string;
  endAction?: ReactNode;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export function NavigationListItemMemo({
  label,
  icon,
  endAction,
  to,
  onMouseLeave,
  onMouseEnter,
}: INavigationListItemProps) {
  const pathMatch = useMatch(to);
  const isActive = Boolean(pathMatch);

  return (
    <ListItem
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      endAction={endAction}
    >
      <ListItemButton
        component={Link}
        to={to}
        variant={isActive ? 'soft' : 'plain'}
        color={isActive ? 'neutral' : undefined}
      >
        <ListItemDecorator>{icon}</ListItemDecorator>
        <ListItemContent>
          <Typography fontSize="sm" noWrap>
            {label}
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

export const NavigationListItem = memo(NavigationListItemMemo);

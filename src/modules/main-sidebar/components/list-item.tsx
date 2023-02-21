import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import React from 'react';

interface IProps {
  text: string;
  icon: JSX.Element;
  onClick: VoidFunction;
  selected?: boolean;
}

export function MainSidebarListItem({
  text,
  icon,
  onClick,
  selected = false,
}: IProps) {
  return (
    <ListItem
      endAction={
        <IconButton
          sx={{ '--IconButton-size': '24px' }}
          size="sm"
          color="neutral"
          variant="plain"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemButton
        onClick={onClick}
        variant={selected ? 'soft' : 'plain'}
        color={selected ? 'primary' : undefined}
      >
        <ListItemDecorator>{icon}</ListItemDecorator>
        <ListItemContent>
          <Typography fontSize="sm" noWrap>
            {text}
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

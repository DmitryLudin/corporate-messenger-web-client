import { DeleteForever, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/joy';
import { MouseEventHandler, useState } from 'react';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLAnchorElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem
      sx={{
        '&:hover': {
          '& .MuiIconButton-root': {
            display: 'flex',
          },
        },
      }}
      endAction={
        <>
          <Tooltip title="Настройка канала" size="sm" arrow placement="right">
            <IconButton
              id="positioned-demo-button"
              aria-controls={open ? 'positioned-demo-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                '--IconButton-size': '24px',
                display: open ? 'flex' : 'none',
              }}
              size="sm"
              color="neutral"
              variant="plain"
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            id="positioned-demo-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            size="sm"
            aria-labelledby="positioned-demo-button"
            placement="top-start"
          >
            <MenuItem onClick={handleClose}>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>
              Edit post
            </MenuItem>
            <MenuItem disabled onClick={handleClose}>
              <ListItemDecorator />
              Draft post
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={handleClose} variant="soft" color="danger">
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <DeleteForever />
              </ListItemDecorator>{' '}
              Delete
            </MenuItem>
          </Menu>
        </>
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

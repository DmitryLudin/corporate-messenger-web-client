import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { IconButton, List, ListItem, ListSubheader } from '@mui/joy';
import React, { PropsWithChildren, useCallback, useState } from 'react';

interface IProps {
  title: string;
}

export function MainSidebarList({
  title,
  children,
}: PropsWithChildren<IProps>) {
  const [isOpen, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <List
      size="sm"
      sx={{
        '--List-item-paddingLeft': '1rem',
        '--List-item-paddingRight': '1rem',
      }}
    >
      <ListItem nested>
        <ListSubheader>
          {title}
          <IconButton
            onClick={handleToggle}
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px', ml: 'auto' }}
          >
            <KeyboardArrowDownRoundedIcon
              fontSize="small"
              color="primary"
              sx={{
                transform: isOpen ? 'initial' : 'rotate(-90deg)',
              }}
            />
          </IconButton>
        </ListSubheader>
        {isOpen && <List aria-labelledby="nav-list-browse">{children}</List>}
      </ListItem>
    </List>
  );
}

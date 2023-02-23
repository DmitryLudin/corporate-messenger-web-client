import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { IconButton, List, ListItem, ListSubheader } from '@mui/joy';
import React, { memo, PropsWithChildren, useCallback, useState } from 'react';

interface IProps {
  title: string;
}

function NavigationListMemo({ title, children }: PropsWithChildren<IProps>) {
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
          <IconButton
            onClick={handleToggle}
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px', mr: 1 }}
          >
            <KeyboardArrowDownRoundedIcon
              fontSize="small"
              color="primary"
              sx={{
                transform: isOpen ? 'initial' : 'rotate(-90deg)',
              }}
            />
          </IconButton>
          {title}
        </ListSubheader>
        {isOpen && <List aria-labelledby="nav-list-browse">{children}</List>}
      </ListItem>
    </List>
  );
}

export const NavigationList = memo(NavigationListMemo);

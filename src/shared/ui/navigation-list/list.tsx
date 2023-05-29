import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { IconButton, List, ListItem, ListSubheader } from '@mui/joy';
import {
  memo,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useState,
} from 'react';

interface IProps {
  title: string;
  endAction?: ReactNode;
}

function NavigationListMemo({
  title,
  endAction,
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
        '--ListItem-radius': '8px',
        '--List-gap': '4px',
      }}
    >
      <ListItem nested endAction={endAction}>
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

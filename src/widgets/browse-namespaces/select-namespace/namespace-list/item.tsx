import { ListItem, ListItemButton } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

type TProps = {
  name: string;
  displayName?: string;
};

export function BrowseNamespaceListItem({ name, displayName }: TProps) {
  const navigate = useNavigate();

  return (
    <ListItem>
      <ListItemButton onClick={() => navigate(`/${name}`)}>
        {displayName || name}
      </ListItemButton>
    </ListItem>
  );
}

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { ListItem, ListItemButton } from '@mui/joy';

export function MentionButton() {
  return (
    <ListItem>
      <ListItemButton>
        <AlternateEmailIcon />
      </ListItemButton>
    </ListItem>
  );
}

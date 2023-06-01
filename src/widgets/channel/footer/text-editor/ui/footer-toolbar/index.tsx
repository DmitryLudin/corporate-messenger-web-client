import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SendIcon from '@mui/icons-material/Send';
import { Box, List, ListItem, ListItemButton } from '@mui/joy';

export function EditorFooterToolbar() {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        gridColumnEnd: -1,
        gridColumnStart: 1,
        gridRowStart: -1,
        flexGrow: 1,
        py: 0.5,
      })}
    >
      <List
        role="toolbar"
        size="sm"
        orientation="horizontal"
        sx={{ '--ListItem-radius': '8px', gap: 0.25 }}
      >
        <ListItem>
          <ListItemButton>
            <SentimentSatisfiedAltIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <AlternateEmailIcon />
          </ListItemButton>
        </ListItem>

        <ListItem sx={{ marginInlineStart: 'auto' }}>
          <ListItemButton disabled>
            <SendIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

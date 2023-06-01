import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import { Box, List, ListDivider, ListItem, ListItemButton } from '@mui/joy';

export function EditorHeaderToolbar() {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        gridArea: 'formatting',
        flexGrow: 1,
        py: 0.5,
        borderBottom: '1px solid',
        borderColor: theme.vars.palette.divider,
      })}
    >
      <List
        role="toolbar"
        size="sm"
        orientation="horizontal"
        sx={{
          '--ListItem-radius': '8px',
          gap: 0.25,
        }}
      >
        <ListItem>
          <ListItemButton selected>
            <FormatBoldIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <FormatItalicIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <StrikethroughSIcon />
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton>
            <InsertLinkIcon />
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton>
            <FormatListNumberedIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <FormatListBulletedIcon />
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton>
            <FormatQuoteIcon />
          </ListItemButton>
        </ListItem>
        <ListDivider inset="gutter" />
        <ListItem>
          <ListItemButton>
            <CodeIcon />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <TerminalIcon />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

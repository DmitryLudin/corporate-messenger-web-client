import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import TerminalIcon from '@mui/icons-material/Terminal';
import { List, ListDivider, ListItem, ListItemButton } from '@mui/joy';
import { memo } from 'react';

import {
  FormatListButton,
  InsertLinkButton,
  TextFormatButton,
  QuoteButton,
  CodeBlockButton,
} from '../buttons';

function EditorHeaderToolbarMemo() {
  return (
    <List
      role="toolbar"
      size="sm"
      orientation="horizontal"
      sx={{
        '--ListItem-radius': '8px',
        gap: 0.25,
      }}
    >
      <TextFormatButton type="bold" icon={<FormatBoldIcon />} />
      <TextFormatButton type="italic" icon={<FormatItalicIcon />} />
      <TextFormatButton type="strikethrough" icon={<StrikethroughSIcon />} />
      <ListDivider inset="gutter" />

      <InsertLinkButton />
      <ListDivider inset="gutter" />

      <FormatListButton type="ol" />
      <FormatListButton type="ul" />
      <ListDivider inset="gutter" />

      <QuoteButton />
      <ListDivider inset="gutter" />

      <TextFormatButton type="code" icon={<CodeIcon />} />
      <CodeBlockButton />
    </List>
  );
}

export const EditorHeaderToolbar = memo(EditorHeaderToolbarMemo);

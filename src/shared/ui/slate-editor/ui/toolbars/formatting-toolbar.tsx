import CodeIcon from '@mui/icons-material/Code';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { List, ListDivider } from '@mui/joy';

import {
  BlockFormattingButton,
  CodeBlockButton,
  LinkButton,
  TextFormattingButton,
} from '../buttons';

export function EditorFormattingToolbar() {
  return (
    <List
      size="sm"
      orientation="horizontal"
      sx={{
        '--ListItem-radius': '8px',
        gap: 0.25,
      }}
    >
      <TextFormattingButton format="bold" icon={<FormatBoldIcon />} />
      <TextFormattingButton format="italic" icon={<FormatItalicIcon />} />
      <TextFormattingButton
        format="strikethrough"
        icon={<StrikethroughSIcon />}
      />
      <ListDivider inset="gutter" />

      <LinkButton />
      <ListDivider inset="gutter" />

      <BlockFormattingButton
        format="numbered-list"
        icon={<FormatListNumberedIcon />}
      />
      <BlockFormattingButton
        format="bulleted-list"
        icon={<FormatListBulletedIcon />}
      />
      <ListDivider inset="gutter" />

      <BlockFormattingButton format="block-quote" icon={<FormatQuoteIcon />} />
      <ListDivider inset="gutter" />

      <TextFormattingButton format="code" icon={<CodeIcon />} />
      <CodeBlockButton />
    </List>
  );
}

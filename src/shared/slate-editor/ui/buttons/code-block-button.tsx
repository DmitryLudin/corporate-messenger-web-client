import TerminalIcon from '@mui/icons-material/Terminal';
import { ListItem, ListItemButton } from '@mui/joy';
import { memo } from 'react';
import { Transforms, Element } from 'slate';
import { useSlateStatic } from 'slate-react';

function CodeBlockButtonMemo() {
  const editor = useSlateStatic();

  const handleClick = () => {
    Transforms.wrapNodes(
      editor,
      { type: 'code-block', language: 'html', children: [] },
      {
        match: (n) => Element.isElement(n) && n.type === 'paragraph',
        split: true,
      }
    );
    Transforms.setNodes(
      editor,
      { type: 'code-line' },
      { match: (n) => Element.isElement(n) && n.type === 'paragraph' }
    );
  };

  return (
    <ListItem>
      <ListItemButton
        variant="plain"
        color="neutral"
        onMouseDown={(event) => {
          event.preventDefault();
          handleClick();
        }}
      >
        <TerminalIcon />
      </ListItemButton>
    </ListItem>
  );
}

export const CodeBlockButton = memo(CodeBlockButtonMemo);

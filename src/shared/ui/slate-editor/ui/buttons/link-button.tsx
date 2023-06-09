import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { ListItem, ListItemButton } from '@mui/joy';
import React from 'react';
import { useSlate } from 'slate-react';

import {
  insertLink,
  isLinkActive,
  unwrapLink,
} from 'shared/ui/slate-editor/lib';

export function LinkButton() {
  const editor = useSlate();
  const isActive = isLinkActive(editor);

  return (
    <ListItem>
      <ListItemButton
        variant={isActive ? 'soft' : 'plain'}
        color="neutral"
        selected={isActive}
        onMouseDown={(event) => {
          event.preventDefault();

          if (isActive) {
            return unwrapLink(editor);
          }

          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          insertLink(editor, url);
        }}
      >
        {isActive ? <LinkOffIcon /> : <InsertLinkIcon />}
      </ListItemButton>
    </ListItem>
  );
}

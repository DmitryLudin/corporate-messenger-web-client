import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { ListItem, ListItemButton } from '@mui/joy';
import React, { memo } from 'react';
import { useSlate } from 'slate-react';

import { insertLink, isLinkActive, unwrapLink } from 'shared/slate-editor/lib';

function LinkButtonMemo() {
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

export const LinkButton = memo(LinkButtonMemo);

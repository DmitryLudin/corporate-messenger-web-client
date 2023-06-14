import SendIcon from '@mui/icons-material/Send';
import { ListItem, ListItemButton } from '@mui/joy';
import React from 'react';
import { useSlate } from 'slate-react';

import { resetEditor } from 'shared/slate-editor/lib';

export function SendButton({
  onSubmit,
  isDisabled,
}: {
  onSubmit: VoidFunction;
  isDisabled: boolean;
}) {
  const editor = useSlate();

  const handleSubmit = () => {
    onSubmit();
    resetEditor(editor);
  };

  return (
    <ListItem>
      <ListItemButton
        variant="plain"
        color="neutral"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        <SendIcon />
      </ListItemButton>
    </ListItem>
  );
}

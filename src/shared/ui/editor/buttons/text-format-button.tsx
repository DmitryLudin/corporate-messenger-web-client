import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListItem, ListItemButton } from '@mui/joy';
import {
  $getSelection,
  FORMAT_TEXT_COMMAND,
  $isRangeSelection,
  TextFormatType,
} from 'lexical';
import { JSX, useCallback, useState } from 'react';

import { useSubscribeUpdateEditor } from 'shared/lib/hooks';

type TProps = {
  type: TextFormatType;
  icon: JSX.Element;
};

export function TextFormatButton({ type, icon }: TProps) {
  const [selected, setSelected] = useState(false);
  const [editor] = useLexicalComposerContext();

  const updateButton = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setSelected(selection.hasFormat(type));
    }
  }, [type]);

  useSubscribeUpdateEditor(editor, updateButton);

  return (
    <ListItem>
      <ListItemButton
        variant={selected ? 'soft' : 'plain'}
        color="neutral"
        selected={selected}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
        }}
      >
        {icon}
      </ListItemButton>
    </ListItem>
  );
}

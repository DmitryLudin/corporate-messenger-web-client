import { ListItem, ListItemButton } from '@mui/joy';
import { JSX, memo, MouseEvent, useCallback } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import type { TCustomEditor } from 'shared/ui/slate-editor/config';

type TProps = {
  format: string;
  icon: JSX.Element;
};

function TextFormattingButtonMemo({ format, icon }: TProps) {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  const handleToggleMark = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      if (isActive) {
        Editor.removeMark(editor, format);
      } else {
        Editor.addMark(editor, format, true);
      }
    },
    [format, isActive, editor]
  );

  return (
    <ListItem>
      <ListItemButton
        variant={isActive ? 'soft' : 'plain'}
        color="neutral"
        selected={isActive}
        onMouseDown={handleToggleMark}
      >
        {icon}
      </ListItemButton>
    </ListItem>
  );
}

function isMarkActive(editor: TCustomEditor, format: string) {
  const marks = Editor.marks(editor);
  // @ts-ignore
  return marks ? marks[format] === true : false;
}

export const TextFormattingButton = memo(TextFormattingButtonMemo);

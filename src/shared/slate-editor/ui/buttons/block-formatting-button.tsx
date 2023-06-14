import { ListItem, ListItemButton } from '@mui/joy';
import { JSX, memo, MouseEvent, useCallback } from 'react';
import { Transforms, Editor, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';

import type { TCustomEditor, TCustomElement } from 'shared/slate-editor/config';

type TProps = {
  format: string;
  icon: JSX.Element;
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

function BlockFormattingButtonMemo({ format, icon }: TProps) {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  const handleToggleBlock = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const isList = LIST_TYPES.includes(format);

      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          LIST_TYPES.includes(n.type),
        split: true,
      });

      const newProperties: Partial<TCustomElement> = {
        // @ts-ignore
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      };
      Transforms.setNodes<SlateElement>(editor, newProperties);

      if (!isActive && isList) {
        const block = { type: format, children: [] };
        // @ts-ignore
        Transforms.wrapNodes(editor, block);
      }
    },
    [editor, format, isActive]
  );

  return (
    <ListItem>
      <ListItemButton
        variant={isActive ? 'soft' : 'plain'}
        color="neutral"
        selected={isActive}
        onMouseDown={handleToggleBlock}
      >
        {icon}
      </ListItemButton>
    </ListItem>
  );
}

function isBlockActive(editor: TCustomEditor, format: string) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );

  return !!match;
}

export const BlockFormattingButton = memo(BlockFormattingButtonMemo);

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { ListItem, ListItemButton } from '@mui/joy';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ENTER_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from '@lexical/list';
import { mergeRegister, $getNearestNodeOfType } from '@lexical/utils';
import { useSubscribeUpdateEditor } from 'shared/lib/hooks';

type TProps = {
  type: 'ul' | 'ol';
};

export function FormatListButton({ type }: TProps) {
  const [selected, setSelected] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleFormatBulletList = () => {
    if (!selected) {
      editor.dispatchCommand(
        type === 'ul'
          ? INSERT_UNORDERED_LIST_COMMAND
          : INSERT_ORDERED_LIST_COMMAND,
        void 0
      );
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, void 0);
    }
    setSelected(!selected);
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_LINE_BREAK_COMMAND,
        () => {
          return selected;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event: KeyboardEvent) => {
          event.preventDefault();

          if (selected && event.shiftKey) {
            editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, void 0);
            editor.dispatchCommand(
              type === 'ul'
                ? INSERT_UNORDERED_LIST_COMMAND
                : INSERT_ORDERED_LIST_COMMAND,
              void 0
            );
          }

          setSelected(false);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, handleFormatBulletList]);

  const updateList = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const nodeType = parentList ? parentList.getTag() : element.getTag();
          setSelected(type === nodeType);
        }
      }
    }
  }, [editor, type]);

  useSubscribeUpdateEditor(editor, updateList);

  return (
    <ListItem>
      <ListItemButton
        variant={selected ? 'soft' : 'plain'}
        color="neutral"
        selected={selected}
        onClick={handleFormatBulletList}
      >
        {type === 'ul' ? (
          <FormatListBulletedIcon />
        ) : (
          <FormatListNumberedIcon />
        )}
      </ListItemButton>
    </ListItem>
  );
}

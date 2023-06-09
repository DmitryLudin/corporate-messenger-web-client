import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { ListItem, ListItemButton } from '@mui/joy';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getSelection, $isRangeSelection } from 'lexical';
import { RangeSelection } from 'lexical/LexicalSelection';
import { $isAtNodeEnd } from '@lexical/selection';
import { useCallback, useState } from 'react';
import { useSubscribeUpdateEditor } from 'shared/lib/hooks';

function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export function InsertLinkButton() {
  const [selected, setSelected] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleInsertLink = useCallback(() => {
    if (!selected) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, selected]);

  const updateLinks = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      setSelected($isLinkNode(parent) || $isLinkNode(node));
    }
  }, []);

  useSubscribeUpdateEditor(editor, updateLinks);

  return (
    <ListItem>
      <ListItemButton
        variant={selected ? 'soft' : 'plain'}
        color="neutral"
        selected={selected}
        onClick={handleInsertLink}
      >
        <InsertLinkIcon />
      </ListItemButton>
    </ListItem>
  );
}

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { ListItem, ListItemButton } from '@mui/joy';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import { useCallback, useState } from 'react';
import { $createQuoteNode, $isHeadingNode } from '@lexical/rich-text';
import { useSubscribeUpdateEditor } from 'shared/lib/hooks';

export function QuoteButton() {
  const [selected, setSelected] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleFormatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode());
      }
    });
  };

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
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        setSelected(type === 'quote');
      }
    }
  }, [editor]);

  useSubscribeUpdateEditor(editor, updateList);

  return (
    <ListItem>
      <ListItemButton
        variant={selected ? 'soft' : 'plain'}
        color="neutral"
        selected={selected}
        onClick={handleFormatQuote}
      >
        <FormatQuoteIcon />
      </ListItemButton>
    </ListItem>
  );
}

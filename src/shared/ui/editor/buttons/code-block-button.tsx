import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import TerminalIcon from '@mui/icons-material/Terminal';
import { ListItem, ListItemButton } from '@mui/joy';
import { $isRangeSelection, $getSelection } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import { useCallback, useState } from 'react';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from '@lexical/code';
import { useSubscribeUpdateEditor } from 'shared/lib/hooks';

export function CodeBlockButton() {
  const [selected, setSelected] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleFormatCode = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createCodeNode());
      }
    });
  };

  const updateCodeBlock = useCallback(() => {
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
        setSelected(type === 'code');
        if ($isCodeNode(element)) {
          console.log(element.getLanguage() || getDefaultCodeLanguage());
        }
      }
    }
  }, [editor]);

  useSubscribeUpdateEditor(editor, updateCodeBlock);

  return (
    <ListItem>
      <ListItemButton
        variant={selected ? 'soft' : 'plain'}
        color="neutral"
        selected={selected}
        onClick={handleFormatCode}
      >
        <TerminalIcon />
      </ListItemButton>
    </ListItem>
  );
}

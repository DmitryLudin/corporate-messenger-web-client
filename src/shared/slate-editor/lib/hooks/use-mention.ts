import { KeyboardEvent, useCallback, useState } from 'react';
import { Editor as SlateEditor, Range, Transforms } from 'slate';

import { TCustomEditor } from 'shared/slate-editor/config';
import { insertMention } from 'shared/slate-editor/lib/utils';

export const useMention = (editor: TCustomEditor, users: string[]) => {
  const [target, setTarget] = useState<Range | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  const chars = users
    .filter((c) => c.toLowerCase().startsWith(search.toLowerCase()))
    .slice(0, 10);

  const handleChange = useCallback(() => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = SlateEditor.before(editor, start, {
        unit: 'word',
      });
      const before = wordBefore && SlateEditor.before(editor, wordBefore);
      const beforeRange = before && SlateEditor.range(editor, before, start);
      const beforeText = beforeRange && SlateEditor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
      const after = SlateEditor.after(editor, start);
      const afterRange = SlateEditor.range(editor, start, after);
      const afterText = SlateEditor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        setTarget(beforeRange);
        setSearch(beforeMatch[1]);
        setIndex(0);
        return;
      }
    }

    setTarget(null);
  }, [editor]);

  const handleInsertMention = useCallback(
    (char: string) => {
      if (target) {
        Transforms.select(editor, target);
        insertMention(editor, char);
        setTarget(null);
      }
    },
    [editor, target]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (target && chars.length > 0) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            handleInsertMention(chars[index]);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [chars, editor, index, target]
  );

  return [
    chars,
    { target, index },
    handleChange,
    handleKeyDown,
    handleInsertMention,
  ] as const;
};

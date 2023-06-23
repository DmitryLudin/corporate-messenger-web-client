import { isKeyHotkey } from 'is-hotkey';
import { KeyboardEventHandler, useCallback } from 'react';
import { Editor, Range, Transforms } from 'slate';

export const useKeyDown = (
  editor: Editor,
  onSubmit: (editor: Editor) => void
): KeyboardEventHandler => {
  return useCallback(
    (event) => {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const { nativeEvent } = event;

        if (isKeyHotkey('enter', nativeEvent)) {
          event.preventDefault();
          onSubmit(editor);
          return;
        }

        if (isKeyHotkey('left', nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: 'offset', reverse: true });
          return;
        }

        if (isKeyHotkey('right', nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: 'offset' });
          return;
        }
      }
    },
    [editor, onSubmit]
  );
};

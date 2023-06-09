import {
  COMMAND_PRIORITY_LOW,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useEffect } from 'react';

export const useSubscribeUpdateEditor = (
  editor: LexicalEditor,
  callback: VoidFunction
) => {
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          callback();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          callback();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, callback]);
};

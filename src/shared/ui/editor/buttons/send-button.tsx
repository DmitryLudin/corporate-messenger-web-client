import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ListItem, ListItemButton } from '@mui/joy';
import {
  COMMAND_PRIORITY_CRITICAL,
  KEY_ENTER_COMMAND,
  LexicalEditor,
} from 'lexical';
import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

type TProps = {
  onSubmit: (value: string, editor: LexicalEditor) => void;
};

function EditorSendButtonMemo({
  onSubmit,
  children,
}: PropsWithChildren<TProps>) {
  const [isDisabled, setDisabled] = useState(true);
  const [editor] = useLexicalComposerContext();

  const handleSubmit = useCallback(() => {
    if (!isDisabled) {
      onSubmit && onSubmit(JSON.stringify(editor.getEditorState()), editor);
    }
  }, [editor, isDisabled, onSubmit]);

  useEffect(() => {
    const removeRegisterEnderCommand = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event: KeyboardEvent) => {
        event.preventDefault();

        if (event.shiftKey) return false;

        handleSubmit();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );

    const removeTextContentListener = editor.registerTextContentListener(
      (textContent) => {
        setDisabled(!Boolean(textContent));
      }
    );

    return () => {
      removeTextContentListener();
      removeRegisterEnderCommand();
    };
  }, [editor, handleSubmit]);

  return (
    <ListItem>
      <ListItemButton disabled={isDisabled} onClick={handleSubmit}>
        {children}
      </ListItemButton>
    </ListItem>
  );
}

export const EditorSendButton = memo(EditorSendButtonMemo);

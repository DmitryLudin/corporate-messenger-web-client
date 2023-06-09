import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ErrorBoundaryType } from '@lexical/react/shared/useDecorators';
import { EditorState } from 'lexical';
import { memo } from 'react';

import { EditorContentEditable } from './input';
import { EditorPlaceholder } from './placeholder';

type TProps = {
  placeholder: string;
  errorBoundary?: ErrorBoundaryType;
  onChange?: (editorState: EditorState) => void;
};

function EditorContentMemo({
  placeholder,
  errorBoundary = LexicalErrorBoundary,
  onChange,
}: TProps) {
  return (
    <>
      <RichTextPlugin
        contentEditable={<EditorContentEditable />}
        placeholder={<EditorPlaceholder>{placeholder}</EditorPlaceholder>}
        ErrorBoundary={errorBoundary}
      />
      {onChange && (
        <OnChangePlugin ignoreSelectionChange={true} onChange={onChange} />
      )}
    </>
  );
}

export const EditorContent = memo(EditorContentMemo);

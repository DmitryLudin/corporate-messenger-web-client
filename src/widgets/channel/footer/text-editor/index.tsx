import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { $getRoot, $getSelection, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import { textEditorTheme } from 'shared/config/themes';
import {
  EditorContainer,
  EditorContentEditable,
  EditorInnerContainer,
  EditorPlaceholder,
  EditorHeaderToolbar,
  EditorFooterToolbar,
} from './ui';

function onChange(editorState: EditorState) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

function onError(error: Error) {
  console.error(error);
}

export function ChannelTextEditor() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme: textEditorTheme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <EditorHeaderToolbar />
        <EditorInnerContainer>
          <RichTextPlugin
            contentEditable={<EditorContentEditable />}
            placeholder={
              <EditorPlaceholder>Enter some text...</EditorPlaceholder>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </EditorInnerContainer>
        <EditorFooterToolbar />
      </EditorContainer>
    </LexicalComposer>
  );
}

import { Sheet } from '@mui/joy';
import { memo, ReactNode, useEffect, useMemo } from 'react';
import { createEditor, Editor as SlateEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { SetNodeToDecorations } from 'shared/slate-editor/ui/set-node-decorators';

import {
  renderElement,
  renderLeaf,
  EditorContainer,
  EditorFooterContainer,
  EditorHeaderContainer,
  EditorInnerContainer,
  EditorFormattingToolbar,
} from './ui';
import { withLink, useDecorate, useKeyDown, resetEditor } from './lib';

import './ui/styles.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-java';

type TProps = {
  placeholder: string;
  onSubmit: (editor: SlateEditor) => void;
  onChange: (value: string) => void;
  users?: string[];
  initialValue?: string;
  isReadOnly?: boolean;
  footer?: ReactNode;
};

const initialState = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function EditorMemo({
  initialValue,
  placeholder,
  isReadOnly = false,
  onSubmit,
  onChange,
  users = [],
  footer,
}: TProps) {
  const editor = useMemo(
    () => withLink(withHistory(withReact(createEditor()))),
    []
  );
  const deserializedInitialValue = useMemo(
    () => (initialValue ? JSON.parse(initialValue) : initialState),
    [initialValue]
  );
  const decorate = useDecorate(editor);
  const onKeyDown = useKeyDown(editor, onSubmit);

  useEffect(() => {
    onChange(JSON.stringify(initialState));
  }, []);

  useEffect(() => {
    if (editor && initialValue) {
      resetEditor(editor, JSON.parse(initialValue));
    }
  }, [initialValue, editor]);

  return (
    <Slate
      editor={editor}
      onChange={(value) => {
        onChange(JSON.stringify(value));
      }}
      initialValue={deserializedInitialValue}
    >
      <SetNodeToDecorations />
      {!isReadOnly ? (
        <Sheet
          sx={(theme) => ({
            border: '1px solid',
            borderColor: theme.vars.palette.divider,
            borderRadius: theme.radius.sm,
          })}
        >
          <EditorContainer>
            <EditorHeaderContainer>
              <EditorFormattingToolbar />
            </EditorHeaderContainer>
            <EditorInnerContainer>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                  onKeyDown(event);
                }}
                decorate={decorate}
                placeholder={placeholder}
                readOnly={isReadOnly}
                style={{ outline: 'none' }}
                spellCheck
                autoFocus
              />
            </EditorInnerContainer>
            <EditorFooterContainer>{footer}</EditorFooterContainer>
          </EditorContainer>
        </Sheet>
      ) : (
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          decorate={decorate}
          placeholder={placeholder}
          readOnly={isReadOnly}
          style={{ outline: 'none', overflow: 'hidden' }}
          spellCheck
          autoFocus
        />
      )}
    </Slate>
  );
}

export const Editor = memo(EditorMemo);

import { Sheet } from '@mui/joy';
import { memo, ReactNode, useEffect, useMemo } from 'react';
import { SetNodeToDecorations } from 'shared/ui/slate-editor/ui/set-node-decorators';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import {
  renderElement,
  renderLeaf,
  EditorContainer,
  EditorFooterContainer,
  EditorHeaderContainer,
  EditorInnerContainer,
  EditorFormattingToolbar,
} from './ui';
import {
  withLink,
  useDecorate,
  useKeyDown,
  withMentions,
  useMention,
} from './lib';

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
  onSubmit: VoidFunction;
  onChange: (value: string) => void;
  users?: string[];
  initialValue?: string;
  isReadOnly?: boolean;
  footer?: ReactNode;
};

const initialState = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ', strikethrough: true },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
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
    () => withMentions(withLink(withHistory(withReact(createEditor())))),
    []
  );
  const deserializedInitialValue = useMemo(
    () => (initialValue ? JSON.parse(initialValue) : initialState),
    [initialValue]
  );
  const decorate = useDecorate(editor);
  const onKeyDown = useKeyDown(editor, onSubmit);
  // const [chars, { target, index }, onMentionChange, onMentionKeyDown] =
  //   useMention(editor, users);

  useEffect(() => {
    onChange(JSON.stringify(initialState));
  }, []);

  return (
    <Slate
      editor={editor}
      onChange={(value) => {
        // onMentionChange();
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
                  // onMentionKeyDown(event);
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

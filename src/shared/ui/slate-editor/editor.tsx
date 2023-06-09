import { Sheet } from '@mui/joy';
import { memo, useMemo } from 'react';
import { SetNodeToDecorations } from 'shared/ui/slate-editor/ui/set-node-decorators';
import { createEditor, Range, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { isKeyHotkey } from 'is-hotkey';

import {
  renderElement,
  renderLeaf,
  EditorContainer,
  EditorFooterContainer,
  EditorHeaderContainer,
  EditorInnerContainer,
  EditorFormattingToolbar,
} from './ui';
import { withLink, useDecorate } from './lib';

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
  initialValue?: string;
  isReadOnly?: boolean;
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

function EditorMemo({ initialValue, placeholder, isReadOnly = false }: TProps) {
  const editor = useMemo(
    () => withLink(withHistory(withReact(createEditor()))),
    []
  );
  const deserializedInitialValue = useMemo(
    () => (initialValue ? JSON.parse(initialValue) : initialState),
    [initialValue]
  );
  const decorate = useDecorate(editor);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const { nativeEvent } = event;
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
  };

  return (
    <Slate editor={editor} initialValue={deserializedInitialValue}>
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
            <SetNodeToDecorations />
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={onKeyDown}
              decorate={decorate}
              placeholder={placeholder}
              readOnly={isReadOnly}
              style={{ outline: 'none' }}
              spellCheck
              autoFocus
            />
          </EditorInnerContainer>
          <EditorFooterContainer>footer</EditorFooterContainer>
        </EditorContainer>
      </Sheet>
    </Slate>
  );
}

export const Editor = memo(EditorMemo);

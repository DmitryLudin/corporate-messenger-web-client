import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { JSX, memo, useMemo } from 'react';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

import { textEditorTheme } from 'shared/config/themes';

type TProps = {
  namespace: string;
  children: JSX.Element;
  initialState?: string;
  isEditable?: boolean;
  onError?: (error: Error) => void;
};

function handleError(error: Error) {
  console.error(error);
}

function EditorComposerMemo({
  namespace,
  initialState,
  onError = handleError,
  isEditable = true,
  children,
}: TProps) {
  const initialConfig: InitialConfigType = useMemo(
    () => ({
      namespace,
      editable: isEditable,
      editorState: initialState,
      theme: textEditorTheme,
      onError,
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
    }),
    [initialState, isEditable, onError, namespace]
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
  );
}

export const EditorComposer = memo(EditorComposerMemo);

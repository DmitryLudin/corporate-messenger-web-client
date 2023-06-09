import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { Sheet } from '@mui/joy';
import { JSX, memo, useEffect } from 'react';

import {
  EditorContainer,
  EditorFooterContainer,
  EditorHeaderContainer,
  EditorInnerContainer,
} from './layouts';
import { AutoLinkingPlugin, CodeHighlightPlugin } from './plugins';

type TProps = {
  content: JSX.Element;
  header?: JSX.Element;
  footer?: JSX.Element;
  plugins?: JSX.Element;
  isEditable?: boolean;
};

function EditorMemo({
  header,
  plugins,
  isEditable = true,
  footer,
  content,
}: TProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(isEditable);
  }, [editor, isEditable]);

  return isEditable ? (
    <Sheet
      sx={(theme) => ({
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
        borderRadius: theme.radius.sm,
      })}
    >
      <EditorContainer>
        {header && <EditorHeaderContainer>{header}</EditorHeaderContainer>}
        <EditorInnerContainer>
          {content}
          <LinkPlugin />
          <ListPlugin />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoLinkingPlugin />
          <CodeHighlightPlugin />
          {plugins}
        </EditorInnerContainer>
        {footer && <EditorFooterContainer>{footer}</EditorFooterContainer>}
      </EditorContainer>
    </Sheet>
  ) : (
    <EditorContainer>
      <EditorInnerContainer>{content}</EditorInnerContainer>
    </EditorContainer>
  );
}

export const Editor = memo(EditorMemo);

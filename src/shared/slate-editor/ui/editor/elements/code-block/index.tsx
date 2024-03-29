import { Box, Sheet } from '@mui/joy';
import { ChangeEventHandler } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';

import {
  TCodeBlockElement,
  TCustomRenderElementProps,
} from 'shared/slate-editor/config';

export function CodeBlockElement({
  attributes,
  children,
  element,
}: TCustomRenderElementProps<TCodeBlockElement>) {
  const isReadOnly = useReadOnly();
  const editor = useSlateStatic();

  const setLanguage = (language: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { language }, { at: path });
  };

  return (
    <Sheet
      {...attributes}
      variant="outlined"
      sx={(theme) => ({
        position: 'relative',
        fontSize: '16px',
        lineHeight: '20px',
        marginTop: '0',
        padding: '5px 13px',
        borderRadius: theme.radius.xs,
        whiteSpace: 'pre',
        overflow: 'auto',
      })}
      spellCheck={false}
    >
      <LanguageSelect
        value={element.language}
        isDisabled={isReadOnly}
        onChange={(e) => setLanguage(e.currentTarget.value)}
      />

      {children}
    </Sheet>
  );
}

const LanguageSelect = ({
  value,
  onChange,
  isDisabled,
}: {
  value: string;
  isDisabled: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <Box
      component="select"
      data-test-id="language-select"
      contentEditable={false}
      disabled={isDisabled}
      sx={{
        position: 'absolute',
        right: '5px',
        top: '5px',
        zIndex: 1,
      }}
      value={value}
      onChange={onChange}
    >
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="java">Java</option>
      <option value="javascript">JavaScript</option>
      <option value="jsx">JSX</option>
      <option value="markdown">Markdown</option>
      <option value="php">PHP</option>
      <option value="python">Python</option>
      <option value="sql">SQL</option>
      <option value="tsx">TSX</option>
      <option value="typescript">TypeScript</option>
    </Box>
  );
};

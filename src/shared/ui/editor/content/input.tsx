import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { styled } from '@mui/joy';
import { memo } from 'react';

export const EditorContentEditable = memo(
  styled(ContentEditable)(({ theme }) => ({
    position: 'relative',
    fontSize: 15,
    tabSize: 1,
    outline: 0,
    padding: theme.spacing(1.5),
    caretColor: theme.vars.palette.text.primary,
  }))
);

import { Box } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function EditorContainerMemo({ children }: PropsWithChildren) {
  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        gridTemplateAreas: `
          "context context context"
          "formatting formatting formatting"
          "input input input"
          "attachments attachments attachments"
          "prefix toolbar_buttons suffix"
        `,
        gridTemplateColumns: 'auto minmax(0,1fr) auto',
        gridTemplateRows: 'auto auto minmax(0,100%) auto auto auto',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        lineHeight: '20px',
        fontWeight: 400,
        textAlign: 'left',

        '.editor-paragraph': {
          margin: 0,
          position: 'relative',
        },
        '.ltr': {
          textAlign: 'left',
        },
        '.rtl': {
          textAlign: 'right',
        },
        '.editor-quote': {
          margin: '0',
          fontSize: '15px',
          color: theme.palette.text.primary,
          borderLeftColor: theme.palette.divider,
          borderLeftWidth: '4px',
          borderLeftStyle: 'solid',
          paddingLeft: '16px',
        },
        '.editor-nested-listitem': {
          listStyleType: 'none',
        },
        '.editor-list-ol': {
          padding: 0,
          margin: 0,
        },
        '.editor-list-ul': {
          padding: 0,
          margin: 0,
        },
        '.editor-listitem': {
          margin: '0 0 0 18px',
        },
        '.editor-link': {
          color: 'rgb(33, 111, 219)',
          textDecoration: 'none',
        },
        '.editor-text-bold': {
          fontWeight: 'bold',
        },
        '.editor-text-italic': {
          fontStyle: 'italic',
        },
        '.editor-text-underline': {
          textDecoration: 'underline',
        },
        '.editor-text-strikethrough': {
          textDecoration: 'line-through',
        },
        '.editor-text-underlineStrikethrough': {
          textDecoration: 'underline line-through',
        },
        '.editor-text-code': {
          backgroundColor: theme.palette.background.level2,
          padding: '1px 0.25rem',
          fontFamily: 'Menlo, Consolas, Monaco, monospace',
          fontSize: '94%',
        },
        '.editor-code': {
          backgroundColor: theme.palette.background.body,
          fontFamily: 'Menlo, Consolas, Monaco, monospace',
          display: 'block',
          padding: '8px 8px 8px 52px',
          lineHeight: 1.53,
          fontSize: '13px',
          margin: 0,
          marginTop: '8px',
          marginBottom: '8px',
          tabSize: 2,
          /* white-space: pre; */
          overflowX: 'auto',
          position: 'relative',
        },
        '.editor-code:before': {
          content: 'attr(data-gutter)',
          position: 'absolute',
          backgroundColor: theme.palette.background.backdrop,
          left: 0,
          top: 0,
          borderRight: `1px solid ${theme.palette.divider}`,
          padding: '8px',
          color: theme.palette.text.secondary,
          whiteSpace: 'pre-wrap',
          textAlign: 'right',
          minWidth: '25px',
        },
        '.editor-code:after': {
          content: 'attr(data-highlight-language)',
          top: 0,
          right: '3px',
          padding: '3px',
          fontSize: '10px',
          textTransform: 'uppercase',
          position: 'absolute',
          color: theme.palette.text.primary,
        },
        '.editor-tokenComment': {
          color: 'slategray',
        },
        '.editor-tokenPunctuation': {
          color: '#999',
        },
        '.editor-tokenProperty': {
          color: '#905',
        },
        '.editor-tokenSelector': {
          color: '#690',
        },
        '.editor-tokenOperator': {
          color: '#9a6e3a',
        },
        '.editor-tokenAttr': {
          color: '#07a',
        },
        '.editor-tokenVariable': {
          color: '#e90',
        },
        '.editor-tokenFunction': {
          color: '#dd4a68',
        },
      })}
    >
      {children}
    </Box>
  );
}

export const EditorContainer = memo(EditorContainerMemo);

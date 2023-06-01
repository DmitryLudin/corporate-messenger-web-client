import { Sheet } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function EditorContainer({ children }: PropsWithChildren) {
  return (
    <Sheet
      sx={(theme) => ({
        display: 'grid',
        gridTemplateAreas: `
          "context context context"
          "formatting formatting formatting"
          "input input input"
          "attachments attachments attachments"
          "broadcast_controls broadcast_controls broadcast_controls"
          "prefix toolbar_buttons suffix"
        `,
        gridTemplateColumns: 'auto minmax(0,1fr) auto',
        gridTemplateRows: 'auto auto minmax(0,100%) auto auto auto',
        position: 'relative',
        width: '100%',
        minHeight: '132px',
        overflow: 'hidden',
        lineHeight: '20px',
        fontWeight: 400,
        textAlign: 'left',
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
        borderRadius: theme.radius.sm,

        '.editor-paragraph': {
          margin: 0,
          marginBottom: theme.spacing(0.5),
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
          marginLeft: '20px',
          fontSize: '15px',
          color: 'rgb(101, 103, 107)',
          borderLeftColor: 'rgb(206, 208, 212)',
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
          marginLeft: '16px',
        },
        '.editor-list-ul': {
          padding: 0,
          margin: 0,
          marginLeft: '16px',
        },
        '.editor-listitem': {
          margin: '8px 32px 8px 32px',
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
          backgroundColor: 'rgb(240, 242, 245)',
          padding: '1px 0.25rem',
          fontFamily: 'Menlo, Consolas, Monaco, monospace',
          fontSize: '94%',
        },
        '.editor-code': {
          backgroundColor: 'rgb(240, 242, 245)',
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
          backgroundColor: '#eee',
          left: 0,
          top: 0,
          borderRight: '1px solid #ccc',
          padding: '8px',
          color: '#777',
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
          color: 'rgba(0, 0, 0, 0.5)',
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
    </Sheet>
  );
}

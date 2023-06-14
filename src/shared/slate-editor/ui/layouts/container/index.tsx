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
        fontWeight: 400,
        textAlign: 'left',
      })}
    >
      {children}
    </Box>
  );
}

export const EditorContainer = memo(EditorContainerMemo);

import { Box } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function EditorInnerContainerMemo({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        gridArea: 'input',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 'calc(60vh - 80px)',
        px: 1,
        pt: 1,
      }}
    >
      {children}
    </Box>
  );
}

export const EditorInnerContainer = memo(EditorInnerContainerMemo);

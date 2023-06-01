import { Box } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function EditorInnerContainer({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        gridArea: 'input',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 'calc(60vh - 80px)',
      }}
    >
      {children}
    </Box>
  );
}

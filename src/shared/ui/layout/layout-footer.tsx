import { Box } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function LayoutFooter({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

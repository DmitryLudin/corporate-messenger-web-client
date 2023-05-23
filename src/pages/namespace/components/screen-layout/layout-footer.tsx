import { Sheet } from '@mui/joy';
import React, { PropsWithChildren } from 'react';

export function ScreenLayoutFooter({ children }: PropsWithChildren) {
  return (
    <Sheet
      sx={{
        width: '100%',
        minHeight: '98px',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
      }}
    >
      {children}
    </Sheet>
  );
}

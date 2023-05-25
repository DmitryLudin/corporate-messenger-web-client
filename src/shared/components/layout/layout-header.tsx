import { Sheet } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function LayoutHeader({ children }: PropsWithChildren) {
  return (
    <Sheet
      sx={{
        width: '100%',
        height: '62px',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {children}
    </Sheet>
  );
}

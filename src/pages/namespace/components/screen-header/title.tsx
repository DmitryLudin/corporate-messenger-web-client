import { Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function ScreenHeaderTitle({ children }: PropsWithChildren) {
  return (
    <Typography fontSize="lg" fontWeight="xl">
      {children}
    </Typography>
  );
}

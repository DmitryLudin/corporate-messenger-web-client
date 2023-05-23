import { Typography } from '@mui/joy';
import React, { PropsWithChildren } from 'react';

export function ScreenHeaderDescription({ children }: PropsWithChildren) {
  return (
    <Typography fontSize="xs" color="neutral">
      {children}
    </Typography>
  );
}

import { Typography } from '@mui/joy';
import React, { PropsWithChildren } from 'react';

export function PageHeaderDescription({ children }: PropsWithChildren) {
  return (
    <Typography fontSize="xs" color="neutral">
      {children}
    </Typography>
  );
}

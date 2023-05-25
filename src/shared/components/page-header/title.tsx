import { Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function PageHeaderTitle({ children }: PropsWithChildren) {
  return (
    <Typography fontSize="lg" fontWeight="xl">
      {children}
    </Typography>
  );
}

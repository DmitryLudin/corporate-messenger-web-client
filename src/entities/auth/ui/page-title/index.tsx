import { Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function AuthPageTitle({ children }: PropsWithChildren) {
  return (
    <Typography component="h2" fontSize="xl2" fontWeight="lg">
      {children}
    </Typography>
  );
}

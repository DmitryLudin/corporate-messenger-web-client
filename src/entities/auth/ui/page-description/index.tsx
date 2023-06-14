import { Typography } from '@mui/joy';
import { PropsWithChildren } from 'react';

export function AuthPageDescription({ children }: PropsWithChildren) {
  return (
    <Typography level="body2" sx={{ my: 1, mb: 3 }}>
      {children}
    </Typography>
  );
}

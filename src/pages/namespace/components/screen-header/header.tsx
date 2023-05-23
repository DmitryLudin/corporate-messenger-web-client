import { Grid, Stack } from '@mui/joy';
import { ScreenHeaderDescription } from 'pages/namespace/components/screen-header/description';
import { ScreenHeaderTitle } from 'pages/namespace/components/screen-header/title';
import { ReactNode } from 'react';

type TProps = {
  title: ReactNode;
  description?: ReactNode;
  endActions?: ReactNode;
};

export function ScreenHeader({ title, description, endActions }: TProps) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <Stack>
        <ScreenHeaderTitle>{title}</ScreenHeaderTitle>
        {description && (
          <ScreenHeaderDescription>{description}</ScreenHeaderDescription>
        )}
      </Stack>
      {endActions}
    </Grid>
  );
}

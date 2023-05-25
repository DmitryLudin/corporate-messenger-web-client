import { Grid, Stack } from '@mui/joy';
import { PageHeaderDescription } from 'components/page-header/description';
import { PageHeaderTitle } from 'components/page-header/title';
import { ReactNode } from 'react';

type TProps = {
  title: ReactNode;
  description?: ReactNode;
  endActions?: ReactNode;
};

export function PageHeader({ title, description, endActions }: TProps) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <Stack>
        <PageHeaderTitle>{title}</PageHeaderTitle>
        {description && (
          <PageHeaderDescription>{description}</PageHeaderDescription>
        )}
      </Stack>
      {endActions}
    </Grid>
  );
}

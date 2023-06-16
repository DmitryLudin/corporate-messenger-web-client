import { Grid, Stack } from '@mui/joy';
import { ReactNode } from 'react';

import { PageHeaderDescription } from './description';
import { PageHeaderTitle } from './title';

type TProps = {
  title: ReactNode;
  description?: ReactNode;
  endActions?: ReactNode;
};

export function NamespacePageHeader({
  title,
  description,
  endActions,
}: TProps) {
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

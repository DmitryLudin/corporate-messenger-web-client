import { Grid, Sheet } from '@mui/joy';

import { NamespaceLogo } from 'entities/namespace';
import { NamespaceSearch } from 'features/namespaces/namespace-search';

import { Account } from './account';

export function NamespaceHeader() {
  return (
    <Sheet
      component="header"
      sx={{
        py: 1,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Grid sx={{ flexGrow: 1 }} container alignItems="center">
        <Grid xs>
          <NamespaceLogo />
        </Grid>
        <Grid xs={4} display="flex" justifyContent="center">
          <NamespaceSearch />
        </Grid>
        <Grid xs display="flex" justifyContent="end">
          <Account />
        </Grid>
      </Grid>
    </Sheet>
  );
}

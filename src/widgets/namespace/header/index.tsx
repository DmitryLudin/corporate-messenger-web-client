import { Grid, Sheet } from '@mui/joy';

import { Account } from './account';
import { Logo } from './logo';
import { Search } from './search';

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
          <Logo />
        </Grid>
        <Grid xs={4} display="flex" justifyContent="center">
          <Search />
        </Grid>
        <Grid xs display="flex" justifyContent="end">
          <Account />
        </Grid>
      </Grid>
    </Sheet>
  );
}

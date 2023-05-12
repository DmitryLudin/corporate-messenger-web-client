import { Grid, Sheet } from '@mui/joy';
import { Account } from 'pages/namespace/modules/header/components/account';
import { Logo } from 'pages/namespace/modules/header/components/logo';
import { Search } from 'pages/namespace/modules/header/components/search';

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

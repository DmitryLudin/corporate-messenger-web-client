import { Box, CircularProgress, Grid } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { Header } from 'pages/app/modules/header';
import { Navigation } from 'pages/app/modules/navigation';
import React, { useEffect } from 'react';
import { namespacesService } from 'shared/domains/namespaces/services/namespaces.service';

const styles = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

function AppMemo() {
  const { isLoading } = namespacesService.store;

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box sx={styles.appLayout}>
      <Header />
      <Navigation />
    </Box>
  );
}

export const App = withObserver(AppMemo);

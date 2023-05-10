import { Box, CircularProgress, Grid, Stack } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { channelsService } from 'pages/namespace/domains/channels/services/channels.service';
import { namespaceService } from 'pages/namespace/domains/namespace/namespace.service';
import { Header } from 'pages/namespace/layouts/header';
import { NavigationBar } from 'pages/namespace/layouts/navigation-bar';
import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { userService } from 'shared/domains/user/user.service';

const styles = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentLayout: {
    flex: '1 1 auto',
  },
};

function NamespaceMemo() {
  const params = useParams<{ namespace: string }>();
  const { isLoading, error } = namespaceService.store;

  useEffect(() => {
    if (params.namespace) {
      namespaceService.getByName(params.namespace).then((namespace) => {
        if (namespace) {
          userService.connect();
          channelsService.connect(namespace.id);
          channelsService.getAllForUser(namespace.id);
        }
      });
    }

    return () => {
      channelsService.resetStore();
      namespaceService.resetStore();
      userService.disconnect();
      channelsService.disconnect();
    };
  }, [params.namespace]);

  if (isLoading) {
    return (
      <Grid sx={styles.appLayout} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={styles.appLayout}>
      <Header />
      <Stack sx={styles.contentLayout} direction="row">
        <NavigationBar />
        <Outlet />
      </Stack>
    </Box>
  );
}

export const NamespacePage = withObserver(NamespaceMemo);

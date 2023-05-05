import { Box, CircularProgress, Grid } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { channelsService } from 'pages/namespace/domains/services/channels.service';
import { namespaceService } from 'pages/namespace/domains/services/namespace.service';
import { Header } from 'pages/namespace/modules/header';
import { Navigation } from 'pages/namespace/modules/navigation';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const styles = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

function NamespaceMemo() {
  const params = useParams<{ namespace: string }>();
  const { isLoading, error } = namespaceService.store;

  useEffect(() => {
    if (params.namespace) {
      namespaceService.getByName(params.namespace).then((namespace) => {
        if (namespace) {
          channelsService.connect(namespace.id);
          channelsService.getAllForUser(namespace.id);
        }
      });
    }

    return () => {
      channelsService.resetStore();
      namespaceService.resetStore();
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
      <Navigation />
    </Box>
  );
}

export const Namespace = withObserver(NamespaceMemo);

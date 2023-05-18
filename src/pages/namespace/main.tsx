import { Box, CircularProgress, Grid } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { NamespaceHeader } from 'pages/namespace/modules/header';
import { NavigationBar } from 'pages/namespace/modules/navigation-bar';
import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { navigationBarChannelsService } from 'shared/domains/channels/services/navigation-bar-channels.service';
import { namespacesService } from 'shared/domains/namespaces/namespaces.service';
import { userService } from 'shared/domains/user/user.service';

const styles = {
  namespaceLayout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  contentLayout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    height: '100%',
  },
};

function NamespaceMemo() {
  const params = useParams<{ namespace: string }>();
  const { isLoading, error } = namespacesService.selectedNamespaceStore;

  useEffect(() => {
    if (params.namespace) {
      namespacesService.getByName(params.namespace).then((namespace) => {
        if (namespace) {
          userService.connect();
          navigationBarChannelsService.getAllForUser();
        }
      });
    }

    return () => {
      namespacesService.resetStore();
      navigationBarChannelsService.resetStore();
      userService.disconnect();
    };
  }, [params.namespace]);

  if (isLoading) {
    return (
      <Grid
        sx={styles.namespaceLayout}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={styles.namespaceLayout}>
      <NamespaceHeader />
      <Box sx={styles.contentLayout}>
        <NavigationBar />
        <Outlet />
      </Box>
    </Box>
  );
}

export const NamespacePage = withObserver(NamespaceMemo);

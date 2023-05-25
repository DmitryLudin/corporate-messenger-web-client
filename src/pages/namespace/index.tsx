import { Box, CircularProgress, Grid } from '@mui/joy';
import { navigationBarChannelsService } from 'pages/namespace/modules/left-sidebar/modules/channels/services/navigation-bar-channels.service';
import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { namespacesService } from 'shared/domains/namespaces';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';
import { NamespaceHeader, NamespaceLeftSidebar } from './modules';

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

function NamespacePageMemo() {
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
        <NamespaceLeftSidebar />
        <Outlet />
      </Box>
    </Box>
  );
}

export const NamespacePage = withObserver(NamespacePageMemo);

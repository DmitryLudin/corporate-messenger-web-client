import { Box, CircularProgress, Grid } from '@mui/joy';
import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { channelsService } from 'entities/channel';
import { userService } from 'entities/user';
import { namespacesService } from 'entities/namespace';
import { NamespaceHeader, NamespaceLeftSidebar } from 'widgets/namespace';

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
          channelsService.init(namespace.id);
          channelsService.getSelfChannels();
          channelsService.connect();
        }
      });
    }

    return () => {
      namespacesService.resetStore();
      channelsService.reset();
      userService.disconnect();
      channelsService.disconnect();
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

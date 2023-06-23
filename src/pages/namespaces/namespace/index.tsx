import { Box, CircularProgress, Grid } from '@mui/joy';
import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { namespacesService } from 'shared/domains/namespace';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { channelsService, selectedChannelService } from 'entities/channel';
import { NamespaceHeader } from 'widgets/namespaces/namespace-header';
import { NamespaceLeftSidebar } from 'widgets/namespaces/namespace-left-sidebar';

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
  const { namespace, isLoading, error } =
    namespacesService.selectedNamespaceStore;

  useEffect(() => {
    if (params.namespace) {
      namespacesService.getByName(params.namespace).then((namespace) => {
        if (namespace) {
          userService.connect();
          channelsService.connect(namespace.id);
          selectedChannelService.listenNewMessage();
          selectedChannelService.listenMessageRemoved();
          selectedChannelService.listenMessageUpdated();
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

  if (isLoading || !namespace) {
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

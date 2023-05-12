import { Box, CircularProgress, Grid, Sheet } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { ChannelContent } from 'pages/namespace/screens/channel/modules/content';
import { ChannelFooter } from 'pages/namespace/screens/channel/modules/footer';
import { ChannelHeader } from 'pages/namespace/screens/channel/modules/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { channelsService } from 'shared/domains/channels/channels.service';
import { namespacesService } from 'shared/domains/namespaces/namespaces.service';

function ChannelScreenMemo() {
  const params = useParams<{ channel: string }>();
  const namespace = namespacesService.selectedNamespaceStore.namespace;
  const { isLoading } = channelsService.selectedChannelStore;

  useEffect(() => {
    if (params.channel && namespace?.id) {
      channelsService.getByName(namespace.id, params.channel).then(() => {
        channelsService.getChannelMembers(namespace.id);
      });
    }
  }, [namespace?.id, params.channel]);

  if (isLoading) {
    return (
      <Grid
        sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <ChannelHeader />
      <ChannelContent />

      <Sheet
        sx={{
          width: '100%',
          height: '98px',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ChannelFooter />
      </Sheet>
    </Box>
  );
}

export const ChannelScreen = withObserver(ChannelScreenMemo);

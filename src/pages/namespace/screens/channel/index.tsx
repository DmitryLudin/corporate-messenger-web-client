import { Box, CircularProgress, Grid } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { ChannelContent } from 'pages/namespace/screens/channel/modules/content';
import { ChannelFooter } from 'pages/namespace/screens/channel/modules/footer';
import { ChannelHeader } from 'pages/namespace/screens/channel/modules/header';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { channelsService } from 'shared/domains/channels/channels.service';

function ChannelScreenMemo() {
  const params = useParams<{ channel: string }>();
  const { isLoading } = channelsService.selectedChannelsStore;

  useEffect(() => {
    if (params.channel) {
      channelsService.getByName(params.channel);
    }
  }, [params.channel]);

  useEffect(() => {
    return () => channelsService.resetStore();
  }, []);

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
      <ChannelFooter />
    </Box>
  );
}

export const ChannelScreen = withObserver(ChannelScreenMemo);

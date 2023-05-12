import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Box, Stack, Typography } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import React from 'react';
import { channelsService } from 'shared/domains/channels/channels.service';

function ChannelInfoMemo() {
  const channel = channelsService.selectedChannelStore.channel;

  return (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TagRoundedIcon />{' '}
        <Typography fontSize="lg" fontWeight="xl2">
          {channel?.getName()}
        </Typography>
      </Box>
      {channel?.description && (
        <Typography fontSize="xs" color="neutral">
          {channel?.description}
        </Typography>
      )}
    </Stack>
  );
}

export const ChannelInfo = withObserver(ChannelInfoMemo);

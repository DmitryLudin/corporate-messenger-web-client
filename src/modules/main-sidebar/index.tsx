import { Divider, Sheet, Stack } from '@mui/joy';
import { Activities } from 'modules/main-sidebar/modules/activities';
import { Channels } from 'modules/main-sidebar/modules/channels';
import { Direct } from 'modules/main-sidebar/modules/direct';
import React from 'react';

export function MainSidebar() {
  return (
    <Sheet
      sx={{
        py: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: {
          sm: '100%',
          md: 240,
        },
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Stack gap={1}>
        <Activities />
        <Divider />
        <Channels />
        <Direct />
      </Stack>
    </Sheet>
  );
}

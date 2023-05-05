import { Divider, Sheet, Stack } from '@mui/joy';
import { Activities } from 'pages/namespace/modules/navigation-bar/modules/activities';
import { Channels } from 'pages/namespace/modules/navigation-bar/modules/channels';
import { Direct } from 'pages/namespace/modules/navigation-bar/modules/direct';
import React from 'react';

export function NavigationBar() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: 'auto',
        maxWidth: {
          sm: '100%',
          md: 240,
        },
        py: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
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

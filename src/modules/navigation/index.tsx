import { Divider, Sheet, Stack } from '@mui/joy';
import { Activities } from 'modules/navigation/modules/activities';
import { Channels } from 'modules/navigation/modules/channels';
import { Direct } from 'modules/navigation/modules/direct';
import React from 'react';

export function Navigation() {
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

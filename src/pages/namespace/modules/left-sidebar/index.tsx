import { Divider, Sheet, Stack } from '@mui/joy';
import {
  Activities,
  Channels,
} from 'pages/namespace/modules/left-sidebar/modules';

export function NamespaceLeftSidebar() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 49px)',
        maxWidth: {
          sm: '100%',
          md: 240,
        },
        py: 1,
        px: 1,
        overflow: 'auto',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack gap={1}>
        <Activities />
        <Divider />
        <Channels />
        {/*<Direct />*/}
      </Stack>
    </Sheet>
  );
}

import { Sheet } from '@mui/joy';
import { ChannelInfo } from 'pages/namespace/screens/channel/modules/header/channel-info';
import { ChannelQuickActions } from 'pages/namespace/screens/channel/modules/header/channel-quick-actions';

export function ChannelHeader() {
  return (
    <Sheet
      sx={{
        width: '100%',
        height: '62px',
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <ChannelInfo />
      <ChannelQuickActions />
    </Sheet>
  );
}

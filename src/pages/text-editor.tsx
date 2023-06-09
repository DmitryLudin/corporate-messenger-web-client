import { Box } from '@mui/joy';
import { ChannelEditor } from 'entities/channel';

export function TestTextEditor() {
  return (
    <Box sx={{ width: 500, mx: 'auto' }}>
      <ChannelEditor />
    </Box>
  );
}

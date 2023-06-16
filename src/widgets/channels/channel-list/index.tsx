import { Box, List, ListDivider } from '@mui/joy';
import { Virtuoso } from 'react-virtuoso';

import { browseChannelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

import { BrowseChannelListItem } from './ui';

function BrowseChannelListMemo() {
  const { channelIds } = browseChannelsService.store;

  return (
    <List
      sx={{
        '--ListDivider-gap': '0px',
        '--ListItem-paddingY': '1.25rem',
        '--ListItem-paddingX': '1rem',
        '--ListItem-paddingRight': '2rem',
      }}
    >
      <Virtuoso
        style={{ height: '100%' }}
        data={channelIds}
        itemContent={(index, channelId) => (
          <Box key={channelId}>
            {index > 0 && <ListDivider />}
            <BrowseChannelListItem channelId={channelId} />
          </Box>
        )}
      ></Virtuoso>
    </List>
  );
}

export const BrowseChannelList = withObserver(BrowseChannelListMemo);

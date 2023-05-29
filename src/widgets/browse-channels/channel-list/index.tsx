import { Box, List, ListDivider } from '@mui/joy';
import { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

import { BrowseChannelListItem } from './ui';

function BrowseChannelListMemo() {
  const channels = channelsService.channelsStore.channels;

  useEffect(() => {
    channelsService.getChannels();
  }, []);

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
        data={channels}
        itemContent={(index, channel) => (
          <Box key={index}>
            {index > 0 && <ListDivider />}
            <BrowseChannelListItem
              name={channel.name}
              displayName={channel?.getName()}
              description={channel.description}
              isMember={channel.isMember}
              membersCount={channel.membersCount}
            />
          </Box>
        )}
      ></Virtuoso>
    </List>
  );
}

export const BrowseChannelList = withObserver(BrowseChannelListMemo);

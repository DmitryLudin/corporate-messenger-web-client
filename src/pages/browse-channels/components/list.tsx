import { Box, List, ListDivider } from '@mui/joy';
import { BrowseChannelListItem } from 'pages/browse-channels/components/list-item';
import { browseChannelsService } from 'pages/browse-channels/services/browse-channels.service';
import { Virtuoso } from 'react-virtuoso';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function BrowseChannelListMemo() {
  const channels = browseChannelsService.store.channels;

  return (
    <List
      sx={{
        '--ListDivider-gap': '0px',
        '--ListItem-paddingY': '1.25rem',
      }}
    >
      <Virtuoso
        style={{ height: '100%' }}
        data={channels}
        itemContent={(index, channel) => (
          <Box sx={{ px: 2 }} key={index}>
            {index > 0 && <ListDivider />}
            <BrowseChannelListItem
              name={channel.name}
              displayName={channel.getName()}
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

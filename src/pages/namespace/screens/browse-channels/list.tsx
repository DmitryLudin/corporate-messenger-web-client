import { Box, List, ListDivider } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { BrowseChannelListItem } from 'pages/namespace/screens/browse-channels/list-item';
import { Virtuoso } from 'react-virtuoso';

const arr: unknown[] = [];
arr.length = 100;

function BrowseChannelListMemo() {
  return (
    <List
      sx={{
        '--ListDivider-gap': '0px',
        '--ListItem-paddingY': '1rem',
      }}
    >
      <Virtuoso
        style={{ height: '100%' }}
        data={arr}
        itemContent={(index, data) => (
          <Box sx={{ px: 2 }} key={index}>
            {index > 0 && <ListDivider />}
            <BrowseChannelListItem />
          </Box>
        )}
      ></Virtuoso>
    </List>
  );
}

export const BrowseChannelList = withObserver(BrowseChannelListMemo);

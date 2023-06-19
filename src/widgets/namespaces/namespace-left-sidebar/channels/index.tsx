import { CircularProgress, IconButton, ListItem } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

import { selfChannelsService } from 'entities/channel';
import { CreateChannelModal } from 'features/channels/create-channel-modal';
import { namespacesService } from 'shared/domains/namespace';
import { withObserver } from 'shared/lib/hoc';
import { useToggle } from 'shared/lib/hooks';
import { NavigationList } from 'shared/ui/navigation-list';

import { SidebarChannelListItem } from './ui';

function SidebarChannelListMemo() {
  const [isOpen, , handleOpen, handleClose] = useToggle();
  const [isLoading, setLoading] = useState(true);
  const selfChannelIds = selfChannelsService.getSelfChannelIds();
  const namespace = namespacesService.selectedNamespaceStore.namespace;

  useEffect(() => {
    if (namespace?.id) {
      selfChannelsService
        .fetchSelfChannels(namespace.id)
        .finally(() => setLoading(false));
    }
  }, [namespace?.id]);

  return (
    <>
      {isOpen && (
        <CreateChannelModal isOpen={isOpen} handleClose={handleClose} />
      )}

      <NavigationList
        title="Каналы"
        endAction={
          <IconButton
            onClick={handleOpen}
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px' }}
          >
            <AddIcon color="primary" />
          </IconButton>
        }
      >
        {isLoading && (
          <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size="sm" />
          </ListItem>
        )}

        {!isLoading &&
          selfChannelIds?.map((channelId) => (
            <SidebarChannelListItem key={channelId} channelId={channelId} />
          ))}
      </NavigationList>
    </>
  );
}

export const SidebarChannelList = withObserver(SidebarChannelListMemo);

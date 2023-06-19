import { Button } from '@mui/joy';
import { useEffect, useState } from 'react';

import { browseChannelsService } from 'entities/channel';
import { namespacesService } from 'shared/domains/namespace';
import { withObserver } from 'shared/lib/hoc';
import { useToggle } from 'shared/lib/hooks';
import { CreateChannelModal } from 'features/channels/create-channel-modal';
import { BrowseChannelList } from 'widgets/channels/channel-list';
import {
  NamespaceContentLayout,
  NamespacePageHeader,
} from 'entities/namespace';

function BrowseChannelsPageMemo() {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, , handleOpen, handleClose] = useToggle();
  const namespace = namespacesService.selectedNamespaceStore.namespace;

  useEffect(() => {
    if (namespace) {
      browseChannelsService
        .fetchChannels(namespace?.id)
        .finally(() => setLoading(false));
    }
  }, [namespace?.id]);

  return (
    <>
      {isOpen && (
        <CreateChannelModal isOpen={isOpen} handleClose={handleClose} />
      )}

      <NamespaceContentLayout
        isLoading={isLoading}
        header={
          <NamespacePageHeader
            title="Все каналы"
            endActions={
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="neutral"
                size="sm"
              >
                Создать канал
              </Button>
            }
          />
        }
      >
        <BrowseChannelList />
      </NamespaceContentLayout>
    </>
  );
}

export const BrowseChannelsPage = withObserver(BrowseChannelsPageMemo);

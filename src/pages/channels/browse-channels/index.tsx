import { Button } from '@mui/joy';
import { useEffect, useState } from 'react';

import { browseChannelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { useToggle } from 'shared/lib/hooks';
import { CreateChannelModal } from 'features/channels';
import { BrowseChannelList } from 'widgets/channels/channel-list';
import {
  NamespaceContentLayout,
  NamespacePageHeader,
} from 'entities/namespace';

function BrowseChannelsPageMemo() {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, , handleOpen, handleClose] = useToggle();

  useEffect(() => {
    browseChannelsService.fetchChannels().finally(() => setLoading(false));
  }, []);

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

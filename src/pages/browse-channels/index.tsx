import { Button } from '@mui/joy';

import { channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { useToggle } from 'shared/lib/hooks';
import { CreateChannelModal } from 'features/channels';
import { Layout } from 'shared/ui/layout';
import { PageHeader } from 'shared/ui/page-header';
import { BrowseChannelList } from 'widgets/browse-channels';

function BrowseChannelsPageMemo() {
  const { isLoading } = channelsService.channelsStore;
  const [isOpen, , handleOpen, handleClose] = useToggle();

  return (
    <>
      {isOpen && (
        <CreateChannelModal isOpen={isOpen} handleClose={handleClose} />
      )}

      <Layout
        isLoading={isLoading}
        header={
          <PageHeader
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
      </Layout>
    </>
  );
}

export const BrowseChannelsPage = withObserver(BrowseChannelsPageMemo);

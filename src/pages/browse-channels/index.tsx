import { Button } from '@mui/joy';
import { Layout } from 'components/layout';
import { PageHeader } from 'components/page-header';
import { CreateChannelModal } from 'modules/create-channel-modal';
import { browseChannelsService } from 'pages/browse-channels/domains';
import { BrowseChannelList } from 'pages/browse-channels/modules';
import { useEffect } from 'react';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';
import { useToggle } from 'shared/lib/hooks/use-toggle';

function BrowseChannelsPageMemo() {
  const [isOpen, , handleOpen, handleClose] = useToggle();
  const { isLoading } = browseChannelsService.store;

  useEffect(() => {
    browseChannelsService.getAll();
  }, []);

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

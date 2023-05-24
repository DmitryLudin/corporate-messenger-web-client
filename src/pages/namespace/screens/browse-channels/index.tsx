import { Button } from '@mui/joy';
import { CreateChannelModal } from 'modules/create-channel-modal';
import { ScreenHeader } from 'pages/namespace/components/screen-header/header';
import { ScreenLayout } from 'pages/namespace/components/screen-layout/layout';
import { BrowseChannelList } from 'pages/namespace/screens/browse-channels/list';
import { useToggle } from 'shared/lib/hooks/use-toggle';

export function BrowseChannelsScreen() {
  const [isOpen, , handleOpen, handleClose] = useToggle();

  return (
    <>
      {isOpen && (
        <CreateChannelModal isOpen={isOpen} handleClose={handleClose} />
      )}

      <ScreenLayout
        header={
          <ScreenHeader
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
        isLoading={false}
      >
        <BrowseChannelList />
      </ScreenLayout>
    </>
  );
}

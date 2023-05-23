import { Button } from '@mui/joy';
import { ScreenHeader } from 'pages/namespace/components/screen-header/header';
import { ScreenLayout } from 'pages/namespace/components/screen-layout/layout';
import { useToggle } from 'pages/namespace/modules/navigation-bar/hooks/use-toggle';
import { CreateChannelPopup } from 'pages/namespace/modules/navigation-bar/modules/channels/components/create-channel-popup/create-channel-popup';
import { BrowseChannelList } from 'pages/namespace/screens/browse-channels/list';

export function BrowseChannelsScreen() {
  const [isOpen, , handleOpen, handleClose] = useToggle();

  return (
    <>
      {isOpen && (
        <CreateChannelPopup isOpen={isOpen} handleClose={handleClose} />
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

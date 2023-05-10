import { CircularProgress, IconButton, ListItem } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import AddIcon from '@mui/icons-material/Add';
import { channelsService } from 'pages/namespace/domains/channels/services/channels.service';
import { NavigationList } from 'pages/namespace/layouts/navigation-bar/components/list';
import { useToggle } from 'pages/namespace/layouts/navigation-bar/hooks/use-toggle';
import { CreateChannelPopup } from 'pages/namespace/layouts/navigation-bar/modules/channels/components/create-channel-popup/create-channel-popup';
import { ChannelListItem } from 'pages/namespace/layouts/navigation-bar/modules/channels/components/list-item';

function ChannelsMemo() {
  const [isOpen, , handleOpen, handleClose] = useToggle();
  const { isLoading, channels } = channelsService.store;

  return (
    <>
      {isOpen && (
        <CreateChannelPopup isOpen={isOpen} handleClose={handleClose} />
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
          <ListItem>
            <CircularProgress size="sm" />
          </ListItem>
        )}

        {!isLoading &&
          channels.map((channel) => (
            <ChannelListItem
              key={channel.id}
              to={`channels/${channel.name}`}
              label={channel.getName()}
            />
          ))}
      </NavigationList>
    </>
  );
}

export const Channels = withObserver(ChannelsMemo);

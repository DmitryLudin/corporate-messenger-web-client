import { CircularProgress, IconButton, ListItem } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import { CreateChannelModal } from 'modules/create-channel-modal';
import { NavigationList } from 'pages/namespace/modules/left-sidebar/components/list';
import { ChannelListItem } from 'pages/namespace/modules/left-sidebar/modules/channels/components/channel-list-item';
import { navigationBarChannelsService } from 'pages/namespace/modules/left-sidebar/modules/channels/services/navigation-bar-channels.service';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';
import { useToggle } from 'shared/lib/hooks/use-toggle';

function ChannelsMemo() {
  const [isOpen, , handleOpen, handleClose] = useToggle();
  const { isLoading, channels } = navigationBarChannelsService.store;

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

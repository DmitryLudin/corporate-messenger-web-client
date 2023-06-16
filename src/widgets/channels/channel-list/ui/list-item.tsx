import {
  Button,
  ListItem,
  ListItemButton,
  ListItemContent,
  Stack,
  Typography,
} from '@mui/joy';
import { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  browseChannelsService,
  ChannelMembersCount,
  ChannelName,
  channelsService,
} from 'entities/channel';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { JoinChannelButton } from 'features/channels';

type TProps = {
  channelId: string;
};

function BrowseChannelListItemMemo({ channelId }: TProps) {
  const [isLoading, setLoading] = useState(false);
  const params = useParams<{ namespace: string }>();
  const channel = browseChannelsService.getChannelById(channelId);
  const user = userService.store.user;

  const handleLeave = useCallback(async () => {
    if (user?.id) {
      setLoading(true);
      await channelsService.leaveChannel(channelId, { userId: user.id });
      setLoading(false);
    }
  }, [channelId, user?.id]);

  if (!channel) return null;

  return (
    <ListItem
      endAction={
        <Stack direction="row" gap={2}>
          {channel.isMember ? (
            <Button
              size="sm"
              variant="outlined"
              color="danger"
              onClick={handleLeave}
              loading={isLoading}
            >
              Покинуть
            </Button>
          ) : (
            <JoinChannelButton channelId={channelId} />
          )}
        </Stack>
      }
    >
      <ListItemButton
        component={Link}
        to={`/${params.namespace}/channels/${channel.name}`}
      >
        <ListItemContent>
          <ChannelName size="sm" name={channel.getName()} />
          <Typography color="neutral" fontSize="xs">
            <Stack gap={0.5} alignItems="center" direction="row">
              {channel.description}
              {channel.description && <span>·</span>}
              <ChannelMembersCount count={channel.membersCount} />
            </Stack>
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

export const BrowseChannelListItem = withObserver(BrowseChannelListItemMemo);

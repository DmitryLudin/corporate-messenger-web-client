import { CircularProgress, ListItem } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { channelsService } from 'pages/namespace/domains/services/channels.service';
import { NavigationList } from 'pages/namespace/modules/navigation/components/list';
import { ChannelListItem } from 'pages/namespace/modules/navigation/modules/channels/components/list-item';
import React from 'react';

function ChannelsMemo() {
  const { isLoading, channels } = channelsService.store;

  return (
    <NavigationList title="Каналы">
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
  );
}

export const Channels = withObserver(ChannelsMemo);

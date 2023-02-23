import { NavigationList } from 'modules/navigation/components/list';
import { ChannelListItem } from 'modules/navigation/modules/channels/components/list-item';
import React from 'react';

export function Channels() {
  return (
    <NavigationList title="Каналы">
      <ChannelListItem id={123} to="channels/2" label="Открытый канал" />
      <ChannelListItem
        isPrivate
        id={321}
        to="channels/2"
        label="Concert tickets"
      />
    </NavigationList>
  );
}

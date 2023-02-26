import { NavigationList } from 'pages/app/modules/navigation/components/list';
import { ChannelListItem } from 'pages/app/modules/navigation/modules/channels/components/list-item';
import React from 'react';

export function Channels() {
  return (
    <NavigationList title="Каналы">
      <ChannelListItem to="channels/2" label="Открытый канал" />
      <ChannelListItem isPrivate to="channels/2" label="Concert tickets" />
    </NavigationList>
  );
}

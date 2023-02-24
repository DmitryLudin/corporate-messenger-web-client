import { UserAvatar } from 'components/user-avatar';
import { NavigationList } from 'modules/navigation/components/list';
import { DirectListItem } from 'modules/navigation/modules/direct/components/list-item';
import React from 'react';

export function Direct() {
  return (
    <NavigationList title="Личные сообщения">
      <DirectListItem
        to="direct/1"
        label="Лудин Дмитрий"
        icon={<UserAvatar size="xs" name="Лудин Дмитрий" />}
      />
      <DirectListItem
        to="direct/2"
        label="Василий Иванович"
        icon={<UserAvatar size="xs" name="Василий Иванович" />}
      />
      <DirectListItem
        to="direct/3"
        label="Иванов Иванович"
        icon={<UserAvatar size="xs" isOnline name="Иванов Иванович" />}
      />
    </NavigationList>
  );
}

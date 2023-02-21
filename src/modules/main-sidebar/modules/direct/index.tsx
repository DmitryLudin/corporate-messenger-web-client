import { UserAvatar } from 'components/user-avatar';
import { MainSidebarList } from 'modules/main-sidebar/components/list';
import { MainSidebarListItem } from 'modules/main-sidebar/components/list-item';
import React from 'react';

export function Direct() {
  return (
    <MainSidebarList title="Личные сообщения">
      <MainSidebarListItem
        text="Лудин Дмитрий"
        icon={<UserAvatar size="xs" name="Лудин Дмитрий" />}
        onClick={() => {}}
      />
      <MainSidebarListItem
        text="Василий Иванович"
        icon={<UserAvatar size="xs" name="Василий Иванович" />}
        onClick={() => {}}
      />
      <MainSidebarListItem
        text="Иванов Иванович"
        icon={<UserAvatar size="xs" isOnline name="Иванов Иванович" />}
        onClick={() => {}}
      />
    </MainSidebarList>
  );
}

import { MainSidebarList } from 'modules/main-sidebar/components/list';
import { MainSidebarListItem } from 'modules/main-sidebar/components/list-item';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';

export function Channels() {
  return (
    <MainSidebarList title="Каналы">
      <MainSidebarListItem
        onClick={() => {}}
        icon={<LockIcon fontSize="small" />}
        text="Personal"
      />
      <MainSidebarListItem
        onClick={() => {}}
        icon={<LockOpenIcon fontSize="small" />}
        text="Concert tickets"
      />
    </MainSidebarList>
  );
}

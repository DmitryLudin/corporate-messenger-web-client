import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import { MainSidebarList } from 'modules/main-sidebar/components/list';
import { MainSidebarListItem } from 'modules/main-sidebar/components/list-item';
import React from 'react';

export function Activities() {
  return (
    <MainSidebarList title="Активности">
      <MainSidebarListItem
        onClick={() => {}}
        selected
        icon={<InboxRoundedIcon color="primary" fontSize="small" />}
        text="Inboxdsadasdasdasdasda"
      />
      <MainSidebarListItem
        onClick={() => {}}
        icon={<OutboxRoundedIcon fontSize="small" />}
        text="Sent"
      />
      <MainSidebarListItem
        onClick={() => {}}
        icon={<DraftsRoundedIcon fontSize="small" />}
        text="Draft"
      />
      <MainSidebarListItem
        onClick={() => {}}
        icon={<AssistantPhotoRoundedIcon fontSize="small" />}
        text="Flagged"
      />
      <MainSidebarListItem
        onClick={() => {}}
        icon={<DeleteRoundedIcon fontSize="small" />}
        text="Trash"
      />
    </MainSidebarList>
  );
}

import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import { NavigationList } from 'pages/namespace/modules/navigation-bar/components/list';
import { NavigationListItem } from 'pages/namespace/modules/navigation-bar/components/list-item';
import React from 'react';

export function Activities() {
  return (
    <NavigationList title="Активности">
      <NavigationListItem
        to="/"
        icon={<InboxRoundedIcon color="primary" fontSize="small" />}
        label="Inbox Inbox Inbox Inbox Inbox Inbox"
      />
      <NavigationListItem
        to="link1"
        icon={<OutboxRoundedIcon fontSize="small" />}
        label="Sent"
      />
      <NavigationListItem
        to="link2"
        icon={<DraftsRoundedIcon fontSize="small" />}
        label="Draft"
      />
      <NavigationListItem
        to="link3"
        icon={<AssistantPhotoRoundedIcon fontSize="small" />}
        label="Flagged"
      />
      <NavigationListItem
        to="link4"
        icon={<DeleteRoundedIcon fontSize="small" />}
        label="Trash"
      />
    </NavigationList>
  );
}

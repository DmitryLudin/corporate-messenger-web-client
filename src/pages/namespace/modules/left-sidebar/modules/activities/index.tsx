import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import {
  NavigationList,
  NavigationListItem,
} from 'pages/namespace/modules/left-sidebar/components';
import { BrowseChannelsIcon } from 'shared/components/icons/browse-channels';

export function Activities() {
  return (
    <NavigationList title="Активности">
      <NavigationListItem
        to="browse-channels"
        icon={<BrowseChannelsIcon color="primary" fontSize="xl" />}
        label="Все каналы"
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

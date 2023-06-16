import { BrowseChannelsIcon } from 'shared/ui/icons';
import { NavigationList, NavigationListItem } from 'shared/ui/navigation-list';

export function SidebarActivities() {
  return (
    <NavigationList title="Активности">
      <NavigationListItem
        to="browse-channels"
        icon={<BrowseChannelsIcon color="primary" fontSize="xl" />}
        label="Все каналы"
      />
    </NavigationList>
  );
}

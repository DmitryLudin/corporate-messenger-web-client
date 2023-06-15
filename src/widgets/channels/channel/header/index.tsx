import { ChannelName, selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { PageHeader } from 'shared/ui/page-header';

import { ChannelQuickActions } from './ui';

function ChannelHeaderMemo() {
  const channel = selectedChannelService.selectedChannel;

  return (
    <PageHeader
      title={channel && <ChannelName name={channel.getName()} />}
      description={channel?.description}
      endActions={<ChannelQuickActions />}
    />
  );
}

export const ChannelHeader = withObserver(ChannelHeaderMemo);

import { ChannelName, channelsService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';
import { PageHeader } from 'shared/ui/page-header';

import { ChannelQuickActions } from './ui';

function ChannelHeaderMemo() {
  const channel = channelsService.getSelectedChannel();

  return (
    <PageHeader
      title={channel && <ChannelName name={channel.getName()} />}
      description={channel?.description}
      endActions={<ChannelQuickActions />}
    />
  );
}

export const ChannelHeader = withObserver(ChannelHeaderMemo);

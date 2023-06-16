import { ChannelName, selectedChannelService } from 'entities/channel';
import { NamespacePageHeader } from 'entities/namespace';
import { withObserver } from 'shared/lib/hoc';

import { ChannelActions } from './ui';

function ChannelHeaderMemo() {
  const channel = selectedChannelService.selectedChannel;

  return (
    <NamespacePageHeader
      title={channel && <ChannelName name={channel.getName()} />}
      description={channel?.description}
      endActions={<ChannelActions />}
    />
  );
}

export const ChannelHeader = withObserver(ChannelHeaderMemo);

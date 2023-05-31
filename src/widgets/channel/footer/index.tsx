import { selectedChannelService } from 'entities/channel';
import { withObserver } from 'shared/lib/hoc';

import { UserNotJoinedChannel } from './ui';

function ChannelFooterMemo() {
  const channel = selectedChannelService.selectedChannel;

  return <>{channel?.isMember ? 'текстовое поле' : <UserNotJoinedChannel />}</>;
}

export const ChannelFooter = withObserver(ChannelFooterMemo);

import { ChannelContent } from 'pages/namespace/screens/channel/modules/content';
import { ChannelFooter } from 'pages/namespace/screens/channel/modules/footer';
import { ChannelHeader } from 'pages/namespace/screens/channel/modules/header';

export function ChannelScreen() {
  return (
    <div>
      <ChannelHeader />
      <ChannelContent />
      <ChannelFooter />
    </div>
  );
}

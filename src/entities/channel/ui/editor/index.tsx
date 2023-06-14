import React, { useCallback, useState } from 'react';

import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { Editor, EditorFooterToolbar, SendButton } from 'shared/slate-editor';

import { selectedChannelService } from '../../domain';

function ChannelEditorMemo() {
  const [value, setValue] = useState('');
  const channel = selectedChannelService.selectedChannel;
  const user = userService.store.user;

  const handleChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  const handleSubmit = useCallback(() => {
    if (user && channel) {
      selectedChannelService.sendMessage({
        text: value,
        userId: user?.id,
        channelId: channel?.id,
      });
      setValue('');
    }
  }, [channel, user, value]);

  if (!channel) return null;

  return (
    <Editor
      placeholder={`Сообщение #${channel.getName()}`}
      onChange={handleChange}
      onSubmit={handleSubmit}
      footer={
        <EditorFooterToolbar
          endAction={<SendButton onSubmit={handleSubmit} isDisabled={!value} />}
        />
      }
    />
  );
}

export const ChannelEditor = withObserver(ChannelEditorMemo);

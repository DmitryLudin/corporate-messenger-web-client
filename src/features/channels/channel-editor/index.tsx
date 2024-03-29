import React, { useCallback, useState } from 'react';
import { resetEditor } from 'shared/slate-editor/lib';
import { Editor as SlateEditor } from 'slate';

import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { selectedChannelService } from 'entities/channel';
import { Editor, EditorFooterToolbar, SendButton } from 'shared/slate-editor';

function ChannelEditorMemo() {
  const [value, setValue] = useState('');
  const channel = selectedChannelService.selectedChannel;
  const user = userService.store.user;

  const handleChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  const handleSubmit = useCallback(
    (editor?: SlateEditor) => {
      if (user && channel) {
        selectedChannelService.sendMessage({
          text: value,
          userId: user?.id,
          channelId: channel?.id,
        });
        setValue('');
        editor && resetEditor(editor);
      }
    },
    [channel, user, value]
  );

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

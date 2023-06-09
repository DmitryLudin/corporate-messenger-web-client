import SendIcon from '@mui/icons-material/Send';
import React, { memo, useState } from 'react';

import { Editor } from 'shared/ui/slate-editor';

function ChannelEditorMemo() {
  const [posts, setPosts] = useState<string[]>([]);

  return (
    <>
      <Editor placeholder="Отправить " />
    </>
  );
}

export const ChannelEditor = memo(ChannelEditorMemo);

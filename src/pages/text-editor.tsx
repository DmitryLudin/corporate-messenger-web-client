import { Box } from '@mui/joy';
import { ChannelEditor } from 'entities/channel';
import { SerializedEditorState } from 'lexical/LexicalEditorState';
import { useCallback, useState } from 'react';

export function TestTextEditor() {
  const [messages, setMessages] = useState<SerializedEditorState[]>([]);

  const handleSubmit = useCallback((data: SerializedEditorState) => {
    setMessages((state) => [...state, data]);
  }, []);

  return (
    <Box sx={{ width: 500, mx: 'auto' }}>
      {/*{messages.map((message) => (*/}
      {/*  <>*/}
      {/*    <MessageEditor*/}
      {/*      isEditable={false}*/}
      {/*      namespace="message_editor"*/}
      {/*      onSubmit={handleSubmit}*/}
      {/*    />*/}
      {/*  </>*/}
      {/*))}*/}
      <ChannelEditor />
    </Box>
  );
}

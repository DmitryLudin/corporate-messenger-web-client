import { List, Stack } from '@mui/joy';
import { memo, ReactNode } from 'react';

type TProps = {
  startAction?: ReactNode;
  endAction?: ReactNode;
};

function EditorFooterToolbarMemo({ startAction, endAction }: TProps) {
  return (
    <List
      size="sm"
      orientation="horizontal"
      sx={{
        '--ListItem-radius': '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0.25}>
        {startAction}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={0.25}>
        {endAction}
      </Stack>
    </List>
  );
}

export const EditorFooterToolbar = memo(EditorFooterToolbarMemo);

import { Box } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function EditorFooterContainerMemo({ children }: PropsWithChildren) {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        gridColumnEnd: -1,
        gridColumnStart: 1,
        gridRowStart: -1,
        flexGrow: 1,
        py: 0.5,
        px: 1,
      })}
    >
      {children}
    </Box>
  );
}

export const EditorFooterContainer = memo(EditorFooterContainerMemo);

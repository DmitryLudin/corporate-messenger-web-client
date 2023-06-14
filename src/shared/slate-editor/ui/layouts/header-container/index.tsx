import { Box } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function EditorHeaderContainerMemo({ children }: PropsWithChildren) {
  return (
    <Box
      component="nav"
      sx={(theme) => ({
        gridArea: 'formatting',
        flexGrow: 1,
        py: 0.5,
        borderBottom: '1px solid',
        borderColor: theme.vars.palette.divider,
      })}
    >
      {children}
    </Box>
  );
}

export const EditorHeaderContainer = memo(EditorHeaderContainerMemo);

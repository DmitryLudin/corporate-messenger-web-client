import { Typography } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function EditorPlaceholderMemo({ children }: PropsWithChildren) {
  return (
    <Typography
      color="neutral"
      sx={(theme) => ({
        overflow: 'hidden',
        position: 'absolute',
        textOverflow: 'ellipsis',
        top: theme.spacing(1.5),
        left: theme.spacing(1.5),
        fontSize: 15,
        userSelect: 'none',
        display: 'inline-block',
        pointerEvents: 'none',
      })}
    >
      {children}
    </Typography>
  );
}

export const EditorPlaceholder = memo(EditorPlaceholderMemo);
import { Typography } from '@mui/joy';

import type { TCustomRenderElementProps } from 'shared/slate-editor/config';

export function DefaultElement({
  children,
  attributes,
}: TCustomRenderElementProps) {
  return (
    <Typography fontSize="md" {...attributes} sx={{ position: 'relative' }}>
      {children}
    </Typography>
  );
}

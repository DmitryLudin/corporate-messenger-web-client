import { Box } from '@mui/joy';

import { TCustomRenderElementProps } from 'shared/ui/slate-editor/config';

export function ListItemElement({
  children,
  attributes,
}: TCustomRenderElementProps) {
  return (
    <Box component="li" {...attributes}>
      {children}
    </Box>
  );
}

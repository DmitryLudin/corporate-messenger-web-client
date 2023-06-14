import { Box } from '@mui/joy';

import { TCustomRenderElementProps } from 'shared/slate-editor/config';

export function NumberedListElement({
  children,
  attributes,
}: TCustomRenderElementProps) {
  return (
    <Box component="ol" sx={{ py: 0, px: 3, margin: 0 }} {...attributes}>
      {children}
    </Box>
  );
}

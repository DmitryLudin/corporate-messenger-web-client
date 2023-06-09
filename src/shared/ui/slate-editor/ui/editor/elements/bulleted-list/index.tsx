import { Box } from '@mui/joy';

import { TCustomRenderElementProps } from 'shared/ui/slate-editor/config';

export function BulletedListElement({
  children,
  attributes,
}: TCustomRenderElementProps) {
  return (
    <Box component="ul" sx={{ py: 0, px: 3, margin: 0 }} {...attributes}>
      {children}
    </Box>
  );
}

import { Box } from '@mui/joy';
import { TCustomRenderElementProps } from 'shared/ui/slate-editor/config';

export function CodeLineElement({
  attributes,
  children,
}: TCustomRenderElementProps) {
  return (
    <Box {...attributes} sx={{ position: 'relative' }}>
      {children}
    </Box>
  );
}

import { Box } from '@mui/joy';

import { TCustomRenderElementProps } from '../../../../config';

export function QuoteElement({
  children,
  attributes,
}: TCustomRenderElementProps) {
  return (
    <Box
      component="blockquote"
      sx={(theme) => ({
        margin: '0',
        color: theme.palette.text.secondary,
        borderLeftColor: theme.palette.divider,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        paddingLeft: '14px',
      })}
      {...attributes}
    >
      {children}
    </Box>
  );
}

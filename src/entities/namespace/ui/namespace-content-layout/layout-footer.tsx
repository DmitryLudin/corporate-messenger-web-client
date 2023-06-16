import { Box } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function NamespaceContentLayoutFooterMemo({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        width: '100%',
        mt: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

export const NamespaceContentLayoutFooter = memo(
  NamespaceContentLayoutFooterMemo
);

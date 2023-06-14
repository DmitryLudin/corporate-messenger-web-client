import { Sheet } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function NamespaceContentLayoutHeaderMemo({ children }: PropsWithChildren) {
  return (
    <Sheet
      sx={{
        width: '100%',
        height: '62px',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {children}
    </Sheet>
  );
}

export const NamespaceContentLayoutHeader = memo(
  NamespaceContentLayoutHeaderMemo
);

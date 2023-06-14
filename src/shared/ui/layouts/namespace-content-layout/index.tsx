import { Box, CircularProgress } from '@mui/joy';
import { memo, PropsWithChildren, ReactNode } from 'react';

import { NamespaceContentLayoutHeader } from './layout-header';
import { NamespaceContentLayoutFooter } from './layout-footer';

type TProps = {
  header?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
};

function NamespaceContentLayoutMemo({
  header,
  children,
  footer,
  isLoading,
}: PropsWithChildren<TProps>) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {header && (
        <NamespaceContentLayoutHeader>{header}</NamespaceContentLayoutHeader>
      )}

      {isLoading ? (
        <Box sx={{ m: 'auto' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {children}
          {footer && (
            <NamespaceContentLayoutFooter>
              {footer}
            </NamespaceContentLayoutFooter>
          )}
        </>
      )}
    </Box>
  );
}

export const NamespaceContentLayout = memo(NamespaceContentLayoutMemo);

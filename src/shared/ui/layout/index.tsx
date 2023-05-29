import { Box, CircularProgress } from '@mui/joy';
import { PropsWithChildren, ReactNode } from 'react';
import { LayoutFooter } from 'shared/ui/layout/layout-footer';
import { LayoutHeader } from 'shared/ui/layout/layout-header';

type TProps = {
  header?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
};

export function Layout({
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
      {header && <LayoutHeader>{header}</LayoutHeader>}

      {isLoading ? (
        <Box sx={{ m: 'auto' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {children}
          {footer && <LayoutFooter>{footer}</LayoutFooter>}
        </>
      )}
    </Box>
  );
}

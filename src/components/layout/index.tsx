import { Box, CircularProgress } from '@mui/joy';
import { LayoutFooter } from 'components/layout/layout-footer';
import { LayoutHeader } from 'components/layout/layout-header';
import { PropsWithChildren, ReactNode } from 'react';

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

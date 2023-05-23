import { Box, CircularProgress } from '@mui/joy';
import { ScreenLayoutFooter } from 'pages/namespace/components/screen-layout/layout-footer';
import { ScreenLayoutHeader } from 'pages/namespace/components/screen-layout/layout-header';
import { PropsWithChildren, ReactNode } from 'react';

type TProps = {
  header?: ReactNode;
  footer?: ReactNode;
  isLoading?: boolean;
};

export function ScreenLayout({
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
      {header && <ScreenLayoutHeader>{header}</ScreenLayoutHeader>}
      {isLoading && (
        <Box sx={{ m: 'auto' }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && children}
      {!isLoading && footer && (
        <ScreenLayoutFooter>{footer}</ScreenLayoutFooter>
      )}
    </Box>
  );
}

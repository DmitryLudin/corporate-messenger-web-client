import { CssBaseline, CssVarsProvider } from '@mui/joy';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import { theme } from 'theme';

export function Main() {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
}

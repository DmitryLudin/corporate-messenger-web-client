import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext } from 'contexts/color-mode.context';
import { useThemeColorMode } from 'hooks/use-theme-color-mode.hook';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';

export function Main() {
  const { colorMode, theme, toggleColorMode } = useThemeColorMode();

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

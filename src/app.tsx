import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { ColorModeContext } from 'contexts/color-mode.context';
import { useThemeColorMode } from 'hooks/use-theme-color-mode.hook';
import React from 'react';

function App() {
  const { colorMode, theme, toggleColorMode } = useThemeColorMode();

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          <Typography>{colorMode} mode</Typography>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

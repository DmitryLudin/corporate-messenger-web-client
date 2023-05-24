import {
  Box,
  CircularProgress,
  CssBaseline,
  CssVarsProvider,
  Grid,
} from '@mui/joy';
import { router } from 'pages';
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';
import { theme } from './theme';

export function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService.authenticate().finally(() => setLoading(false));
  }, []);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {isLoading ? (
        <Grid
          minHeight="100vh"
          height="100%"
          container
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="primary" variant="soft" />
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <RouterProvider router={router} />
        </Box>
      )}
    </CssVarsProvider>
  );
}

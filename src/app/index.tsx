import {
  Box,
  CircularProgress,
  CssBaseline,
  CssVarsProvider,
  Grid,
} from '@mui/joy';
import { router } from 'pages';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { theme } from 'shared/config/theme';
import { authService } from 'shared/domains/auth';

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
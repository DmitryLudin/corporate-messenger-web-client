import { CircularProgress, CssBaseline, CssVarsProvider, Grid } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import { authService } from 'shared/domains/auth/auth.service';
import { namespacesService } from 'shared/domains/namespaces/services/namespaces.service';
import { theme } from 'theme';

export function Main() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService
      .authenticate()
      .then(() => {
        namespacesService.getAll();
      })
      .finally(() => setLoading(false));
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
        <RouterProvider router={router} />
      )}
    </CssVarsProvider>
  );
}

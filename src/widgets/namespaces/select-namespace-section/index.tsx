import { Box, CircularProgress, Grid, Typography } from '@mui/joy';
import { useEffect } from 'react';

import { withObserver } from 'shared/lib/hoc';
import { browseNamespacesService } from 'shared/domains/namespace';

import { BrowseNamespaceList } from './ui';

export function SelectNamespaceMemo() {
  const { isLoading, namespaces } = browseNamespacesService.store;

  useEffect(() => {
    browseNamespacesService.getAll();
  }, []);

  return (
    <section>
      {isLoading ? (
        <Grid sx={{ mt: 3 }} container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        namespaces.length > 0 && (
          <>
            <Typography level="body2" sx={{ mt: 3, mb: 2 }}>
              Выберите пространство из списка.
            </Typography>

            <Box maxWidth={400}>
              <BrowseNamespaceList namespaces={namespaces} />
            </Box>
          </>
        )
      )}
    </section>
  );
}

export const SelectNamespaceSection = withObserver(SelectNamespaceMemo);

import {
  Box,
  CircularProgress,
  Divider,
  formLabelClasses,
  Grid,
  Stack,
} from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { CreateNamespace } from 'pages/namespaces/components/create-namespace/create-namespace';
import { SelectNamespace } from 'pages/namespaces/components/select-namespace/select-namespace';
import { useEffect } from 'react';
import { namespacesService } from 'shared/domains/namespaces/services/namespaces.service';

function NamespacesMemo() {
  const { isLoading, namespaces } = namespacesService.store;

  useEffect(() => {
    namespacesService.getAll();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        px: 2,
        py: 2,
        margin: '0 auto',
        width: '100%',
        maxWidth: 500,
        [`& .${formLabelClasses.asterisk}`]: {
          visibility: 'hidden',
        },
      }}
    >
      <Stack justifyContent="center" spacing={4}>
        <CreateNamespace />

        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          namespaces.length > 0 && (
            <>
              <Divider sx={{ maxWidth: 400, width: '100%' }}>Или</Divider>
              <SelectNamespace />
            </>
          )
        )}
      </Stack>
    </Box>
  );
}

export const Namespaces = withObserver(NamespacesMemo);

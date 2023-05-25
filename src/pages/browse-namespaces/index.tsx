import { Box, Divider, formLabelClasses, Stack } from '@mui/joy';
import { CreateNamespaceSection } from 'pages/browse-namespaces/modules/create-namespace';
import { JoinNamespaceSection } from 'pages/browse-namespaces/modules/join-namespace';
import { SelectNamespaceSection } from 'pages/browse-namespaces/modules/select-namespace';
import React, { useEffect } from 'react';
import { namespacesService } from 'shared/domains/namespaces';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function BrowseNamespacesPageMemo() {
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
        <CreateNamespaceSection />
        <Divider sx={{ maxWidth: 400, width: '100%' }}>Или</Divider>
        <JoinNamespaceSection />
        <SelectNamespaceSection />
      </Stack>
    </Box>
  );
}

export const BrowseNamespacesPage = withObserver(BrowseNamespacesPageMemo);

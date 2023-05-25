import { Box, Divider, formLabelClasses, Stack } from '@mui/joy';
import { browseNamespacesService } from 'pages/browse-namespaces/domains';
import {
  CreateNamespaceSection,
  JoinNamespaceSection,
  SelectNamespaceSection,
} from 'pages/browse-namespaces/modules';
import { useEffect } from 'react';

export function BrowseNamespacesPage() {
  useEffect(() => {
    browseNamespacesService.getAll();
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

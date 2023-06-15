import { Box, Divider, formLabelClasses, Stack, Typography } from '@mui/joy';

import { JoinNamespaceForm } from 'features/namespaces/join-namespace';
import { CreateNamespaceSection } from 'widgets/namespaces/create-namespace-section';
import { SelectNamespaceSection } from 'widgets/namespaces/select-namespace-section';

export function BrowseNamespacesPage() {
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

        <section>
          <Typography component="h2" fontSize="xl2" fontWeight="lg">
            Войдите в ранее созданное
          </Typography>
          <Typography level="body2" sx={{ my: 1, mb: 2 }}>
            Введите URL-адресс пространства.
          </Typography>

          <Box sx={{ maxWidth: 400 }}>
            <JoinNamespaceForm />
          </Box>
        </section>

        <SelectNamespaceSection />
      </Stack>
    </Box>
  );
}

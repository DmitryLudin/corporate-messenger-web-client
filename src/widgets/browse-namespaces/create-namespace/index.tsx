import { Box, Typography } from '@mui/joy';

import { CreateNamespaceForm } from './form';

export function CreateNamespaceSection() {
  return (
    <section>
      <Typography component="h3" level="h3" fontWeight="lg">
        Создайте свое пространство
      </Typography>
      <Typography level="body2" sx={{ my: 1, mb: 2 }}>
        Введите название и URL-адрес вашего нового пространства.
      </Typography>

      <Box maxWidth={400}>
        <CreateNamespaceForm />
      </Box>
    </section>
  );
}

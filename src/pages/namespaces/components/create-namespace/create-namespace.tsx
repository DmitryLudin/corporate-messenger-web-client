import { Box, Typography } from '@mui/joy';
import { CreateNamespaceForm } from 'pages/namespaces/components/create-namespace/create-form';

export function CreateNamespace() {
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

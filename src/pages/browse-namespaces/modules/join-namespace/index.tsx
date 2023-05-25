import { Button, FormControl, Input, Typography } from '@mui/joy';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { browseNamespacesService } from 'pages/browse-namespaces/domains';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cyrillicToTranslit = CyrillicToTranslit();

export function JoinNamespaceSection() {
  const [namespaceUrl, setNamespaceUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinNamespace = useCallback(async () => {
    try {
      setLoading(true);
      await browseNamespacesService.join(namespaceUrl);
      navigate(`/${namespaceUrl}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [namespaceUrl, navigate]);

  return (
    <section>
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        Войдите в ранее созданное
      </Typography>

      <Typography level="body2" sx={{ my: 1, mb: 2 }}>
        Введите URL-адресс пространства.
      </Typography>
      <FormControl sx={{ maxWidth: 400 }}>
        <Input
          value={namespaceUrl}
          name="namespace-url"
          endDecorator={
            <Button loading={isLoading} onClick={handleJoinNamespace}>
              Войти
            </Button>
          }
          onChange={(e) =>
            setNamespaceUrl(
              cyrillicToTranslit.transform(e.target.value, '-').toLowerCase()
            )
          }
          placeholder="namespace-address"
          type="text"
        />
      </FormControl>
    </section>
  );
}

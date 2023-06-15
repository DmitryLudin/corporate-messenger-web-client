import { Button, FormControl, Input } from '@mui/joy';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { browseNamespacesService } from 'shared/domains/namespace';

const cyrillicToTranslit = CyrillicToTranslit();

export function JoinNamespaceForm() {
  const [namespaceUrl, setNamespaceUrl] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeUrl = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNamespaceUrl(
      cyrillicToTranslit.transform(e.target.value, '-').toLowerCase()
    );
  }, []);

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
    <FormControl>
      <Input
        type="text"
        name="namespace-url"
        placeholder="namespace-address"
        value={namespaceUrl}
        onChange={handleChangeUrl}
        endDecorator={
          <Button loading={isLoading} onClick={handleJoinNamespace}>
            Войти
          </Button>
        }
      />
    </FormControl>
  );
}

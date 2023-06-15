import { Button, Grid } from '@mui/joy';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  browseNamespacesService,
  TCreateNamespaceDto,
} from 'shared/domains/namespace';

import { NamespaceDisplayNameField, NamespaceNameField } from './ui';

const defaultFormState = { name: '', displayName: '' };

export function CreateNamespaceForm() {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (data: TCreateNamespaceDto) => {
      setLoading(true);
      return browseNamespacesService
        .create(data)
        .then((namespace) => navigate(`/${namespace.name}`))
        .catch()
        .finally(() => setLoading(false));
    },
    [navigate]
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Grid container flexDirection="column" gap={2}>
          <NamespaceDisplayNameField />
          <NamespaceNameField />

          <Button loading={isLoading} type="submit" fullWidth>
            Создать
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}

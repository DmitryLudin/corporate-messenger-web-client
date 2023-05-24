import { Button, Grid } from '@mui/joy';
import { NamespaceDisplayNameField } from 'pages/namespaces/modules/create-namespace/form/display-name-field';
import { NamespaceNameField } from 'pages/namespaces/modules/create-namespace/form/name-field';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { namespacesService } from 'shared/domains/namespaces/namespaces.service';

const defaultFormState = { name: '', displayName: '' };

export type TCreateNamespaceForm = typeof defaultFormState;

export function CreateNamespaceForm() {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (data: TCreateNamespaceForm) => {
      setLoading(true);
      return namespacesService
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

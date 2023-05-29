import { Box, Button, Grid, Link } from '@mui/joy';
import { useCallback, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

import { authService } from 'entities/user';

import { SignupNameField } from './name-field';
import { SignupPasswordField } from './password-field';
import { SignupUsernameField } from './username-field';

const defaultFormState = { username: '', password: '', name: '' };

export function SignupForm() {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ username, password, name }: typeof defaultFormState) => {
      setLoading(true);
      await authService.signUp({ displayName: name, username, password });
      setLoading(false);
    },
    []
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Grid container flexDirection="column" gap={2}>
          <SignupNameField />
          <SignupUsernameField />
          <SignupPasswordField />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              fontSize="sm"
              to="/login"
              component={RouterLink}
              fontWeight="lg"
            >
              Уже есть учетная запись? Войти
            </Link>
          </Box>

          <Button loading={isLoading} type="submit" fullWidth>
            Создать
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}

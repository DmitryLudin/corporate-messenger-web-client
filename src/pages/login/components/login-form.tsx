import { Button, Grid, Link } from '@mui/joy';
import { LoginPasswordField } from 'pages/login/components/password-field';
import { LoginUsernameField } from 'pages/login/components/username-field';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';

const defaultFormState = { username: '', password: '' };

export function LoginForm() {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: typeof defaultFormState) => {
    setLoading(true);
    await authService.logIn(data);
    setLoading(false);
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Grid container flexDirection="column" gap={2}>
          <LoginUsernameField />
          <LoginPasswordField />

          <Grid container justifyContent="space-between" alignItems="center">
            <Link
              fontSize="sm"
              to="/signup"
              component={RouterLink}
              fontWeight="lg"
            >
              Нет учетной записи? Создать
            </Link>
          </Grid>

          <Button loading={isLoading} type="submit" fullWidth>
            Войти
          </Button>
        </Grid>
      </form>
    </FormProvider>
  );
}

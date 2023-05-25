import { Box, formLabelClasses, Typography } from '@mui/joy';
import { LoginForm } from 'pages/login/login-form';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from 'shared/domains/auth';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function LoginPageMemo() {
  const { state } = useLocation();
  const stateWithFrom = state as { from?: Location } | undefined;

  if (authService.store.isAuthorized) {
    return (
      <Navigate to={stateWithFrom?.from?.pathname || '/namespaces'} replace />
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        component="main"
        sx={{
          p: 2,
          width: 400,
          maxWidth: '100%',
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: 'hidden',
          },
        }}
      >
        <div>
          <Typography component="h2" fontSize="xl2" fontWeight="lg">
            Добро пожаловать
          </Typography>
          <Typography level="body2" sx={{ my: 1, mb: 3 }}>
            Пожалуйста, введите свои данные чтобы войти.
          </Typography>
        </div>

        <LoginForm />
      </Box>
    </Box>
  );
}

export const LoginPage = withObserver(LoginPageMemo);

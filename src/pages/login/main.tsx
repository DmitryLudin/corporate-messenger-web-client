import { Box, formLabelClasses, Typography } from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import { LoginForm } from 'pages/login/components/login-form';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';

function LoginMemo() {
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
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
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

export const LoginPage = withObserver(LoginMemo);

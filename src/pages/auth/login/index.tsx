import { Navigate, useLocation } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { AuthPageHeader, AuthPageLayout, authService } from 'entities/auth';
import { LoginForm } from 'features/auth/login';

function LoginPageMemo() {
  const { state } = useLocation();
  const stateWithFrom = state as { from?: Location } | undefined;

  if (authService.store.isAuthorized) {
    return (
      <Navigate to={stateWithFrom?.from?.pathname || '/namespaces'} replace />
    );
  }

  return (
    <AuthPageLayout>
      <AuthPageHeader
        title="Добро пожаловать"
        description="Пожалуйста, введите свои данные чтобы войти."
      />
      <LoginForm />
    </AuthPageLayout>
  );
}

export const LoginPage = withObserver(LoginPageMemo);

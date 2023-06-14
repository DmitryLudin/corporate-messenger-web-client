import { Navigate, useLocation } from 'react-router-dom';

import { authService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';
import { LoginForm } from 'widgets/auth';
import { AuthLayout, AuthPageDescription, AuthPageTitle } from 'entities/auth';

function LoginPageMemo() {
  const { state } = useLocation();
  const stateWithFrom = state as { from?: Location } | undefined;

  if (authService.store.isAuthorized) {
    return (
      <Navigate to={stateWithFrom?.from?.pathname || '/namespaces'} replace />
    );
  }

  return (
    <AuthLayout>
      <div>
        <AuthPageTitle>Добро пожаловать</AuthPageTitle>
        <AuthPageDescription>
          Пожалуйста, введите свои данные чтобы войти.
        </AuthPageDescription>
      </div>

      <LoginForm />
    </AuthLayout>
  );
}

export const LoginPage = withObserver(LoginPageMemo);

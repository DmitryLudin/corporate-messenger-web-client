import { Navigate, useLocation } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { SignupForm } from 'widgets/auth';
import { authService } from 'shared/domains/user';
import { AuthLayout, AuthPageDescription, AuthPageTitle } from 'entities/auth';

export function SignupPageMemo() {
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
          Давайте начнем! Пожалуйста, введите свои данные.
        </AuthPageDescription>
      </div>

      <SignupForm />
    </AuthLayout>
  );
}

export const SignupPage = withObserver(SignupPageMemo);

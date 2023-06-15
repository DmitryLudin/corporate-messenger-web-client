import { Navigate, useLocation } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { AuthPageHeader, AuthPageLayout, authService } from 'entities/auth';
import { SignupForm } from 'features/auth/signup';

function SignupPageMemo() {
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
        description="Давайте начнем! Пожалуйста, введите свои данные."
      />
      <SignupForm />
    </AuthPageLayout>
  );
}

export const SignupPage = withObserver(SignupPageMemo);

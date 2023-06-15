import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';

import { authService } from '../../domains';

function PrivateRouteObserver() {
  const location = useLocation();
  const isAuthorized = authService.store.isAuthorized;

  if (!isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export const PrivateRoute = withObserver(PrivateRouteObserver);

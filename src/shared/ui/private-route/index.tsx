import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { authService } from 'shared/domains/user';

function PrivateRouteObserver() {
  const location = useLocation();
  const isAuthorized = authService.store.isAuthorized;

  if (!isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export const PrivateRoute = observer(PrivateRouteObserver);

import { PrivateRoute } from 'components/private-route';
import { Namespace } from 'pages/namespace/main';
import { Login } from 'pages/login/main';
import { Namespaces } from 'pages/namespaces/main';
import { Signup } from 'pages/signup/main';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '', index: true, element: <Navigate to={'/namespaces'} /> },
      { path: 'namespaces', element: <Namespaces /> },
      {
        path: ':namespace',
        element: <Namespace />,
        children: [{ path: 'channels/:channel', element: <div>канал</div> }],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

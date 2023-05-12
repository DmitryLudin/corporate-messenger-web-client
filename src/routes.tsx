import { PrivateRoute } from 'components/private-route';
import { NamespacePage } from 'pages/namespace/main';
import { LoginPage } from 'pages/login/main';
import { ChannelScreen } from 'pages/namespace/screens/channel';
import { NamespacesPage } from 'pages/namespaces/main';
import { SignupPage } from 'pages/signup/main';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '', index: true, element: <Navigate to={'/namespaces'} /> },
      { path: 'namespaces', element: <NamespacesPage /> },
      {
        path: ':namespace/*',
        element: <NamespacePage />,
        children: [
          { path: 'channels/:channel/*', element: <ChannelScreen /> },
          { path: 'direct/:user/*', element: <div>личное сообщение</div> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

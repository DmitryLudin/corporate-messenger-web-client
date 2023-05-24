import { LoginPage } from 'pages/login';
import {
  BrowseChannelsScreen,
  ChannelScreen,
  NamespacePage,
} from 'pages/namespace';
import { NamespacesPage } from 'pages/namespaces';
import { SignupPage } from 'pages/signup';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PrivateRoute } from 'shared/components/private-route';

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
          { path: 'browse-channels', element: <BrowseChannelsScreen /> },
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

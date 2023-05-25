import { PrivateRoute } from 'components/private-route';
import { BrowseChannelsPage } from 'pages/browse-channels';
import { ChannelPage } from 'pages/channel';
import { LoginPage } from 'pages/login';
import { NamespacePage } from 'pages/namespace';
import { BrowseNamespacesPage } from 'pages/browse-namespaces';
import { SignupPage } from 'pages/signup';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      { path: '', index: true, element: <Navigate to={'/namespaces'} /> },
      { path: 'namespaces', element: <BrowseNamespacesPage /> },
      {
        path: ':namespace/*',
        element: <NamespacePage />,
        children: [
          { path: 'channels/:channel/*', element: <ChannelPage /> },
          { path: 'browse-channels', element: <BrowseChannelsPage /> },
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

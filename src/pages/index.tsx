import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute } from 'entities/auth';

import { LoginPage, SignupPage } from './auth';
import { BrowseNamespacesPage, NamespacePage } from './namespaces';
import { ChannelPage, BrowseChannelsPage } from './channels';

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

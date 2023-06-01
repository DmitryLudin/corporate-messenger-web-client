import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute } from 'shared/ui/private-route';
import { ChannelTextEditor } from 'widgets/channel/footer/text-editor';

import { BrowseChannelsPage } from './browse-channels';
import { BrowseNamespacesPage } from './browse-namespaces';
import { ChannelPage } from './channel';
import { LoginPage } from './login';
import { NamespacePage } from './namespace';
import { SignupPage } from './signup';

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
  { path: '/editor', element: <ChannelTextEditor /> },
]);

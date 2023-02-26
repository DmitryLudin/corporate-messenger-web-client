import { App } from 'pages/app/main';
import { Login } from 'pages/login/main';
import { Signup } from 'pages/signup/main';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

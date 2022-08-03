import * as React from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import authRoutes from './auth';

const Home = React.lazy(() => import('../pages/Home'));

function App() {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Outlet />
    </React.Suspense>
  );
}

const appRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <Home /> }]
  }
];

export default function AppRoute() {
  const { user } = useAuth();

  const route = user ? [] : authRoutes;
  const elements = useRoutes([...appRoutes, ...route]);

  return elements;
}

import * as React from 'react';
import { Route, Routes } from 'react-router-dom';

const SignIn = React.lazy(() => import('../pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('../pages/Auth/SignUp'));

function AuthRoute() {
  return (
    <React.Suspense>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </React.Suspense>
  );
}

const authRoutes = [
  {
    path: '/*',
    element: <AuthRoute />
  }
];

export default authRoutes;

import * as React from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context)
    throw new Error(`useAuth can only be used inside an AuthProvider`);

  return context;
}

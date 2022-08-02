import * as React from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function useAuth() {
  const { user } = React.useContext(AuthContext);

  return user;
}

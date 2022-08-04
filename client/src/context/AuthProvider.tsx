import * as React from 'react';
import axios from 'axios';
import { SERVERURL } from '../config';
import { IUser } from './DBProvider';

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface IAuth {
  user: IUser | null;
  // TODO: Better typing on the return value
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (data: SignUpCredentials) => Promise<any>;
  verifyUser: () => Promise<any>;
  signOut: () => void;
}

export const AuthContext = React.createContext<IAuth>({
  user: null,
  signIn: async () => undefined,
  signUp: async () => undefined,
  verifyUser: async () => undefined,
  signOut: () => undefined
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState(null);

  const verifyUser = async () => {
    const response = await axios.get(`${SERVERURL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setUser(response.data.user);
    return response;
  };

  const signIn = async (email: string, password: string) => {
    return axios.post(`${SERVERURL}/auth/signin`, {
      email,
      password
    });
  };

  const signUp = async (data: SignUpCredentials) => {
    return axios.post(`${SERVERURL}/auth/signup`, {
      ...data
    });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  React.useEffect(() => {
    verifyUser();
  }, []);

  const values = React.useMemo(() =>
    ({ user, signIn, signUp, signOut, verifyUser }),
    [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

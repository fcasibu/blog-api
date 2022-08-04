import axios from 'axios';
import * as React from 'react';
import { SERVERURL } from '../config';
import useAuth from '../hooks/useAuth';
import { IPost } from './DBProvider';

interface ICMSDocuments {
  posts: IPost[];
  post: IPost | null;
}

interface ICMS {
  documents: ICMSDocuments;
}

export const CMSContext = React.createContext<ICMS>({
  documents: {} as ICMSDocuments
});

export default function CMSProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [documents, setDocuments] = React.useState({
    posts: [],
    post: null
  });

  React.useEffect(() => {
    let ignore = false;

    if (user) {
      const getDocuments = async () => {
        const response = await axios.get(
          `${SERVERURL}/api/users/${user._id}/posts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if (!ignore)
          setDocuments((prevState) => ({
            ...prevState,
            posts: response.data.posts
          }));
      };

      getDocuments();
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  const values = React.useMemo(() => ({ documents }), [documents]);
  return <CMSContext.Provider value={values}>{children}</CMSContext.Provider>;
}

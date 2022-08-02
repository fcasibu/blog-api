import axios from 'axios';
import * as React from 'react';
import { SERVERURL } from '../config';

export interface IUser {
  username: string;
  email: string;
  id: string;
  __v: number;
}

export interface IPost {
  tag: string;
  formattedDate: string;
  commentCount: number;
  author: IUser;
  title: string;
  body: string;
  id: string;
  published: boolean;
  createdAt: Date;
  __v: number;
}

interface IDatabase {
  posts: IPost[];
}

export const DBContext = React.createContext<IDatabase>({
  posts: []
});

export default function DBProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    let ignore = false;
    async function getPosts() {
      const response = await axios.get(`${SERVERURL}/api/posts`);

      if (!ignore) setPosts(response.data.posts);
    }

    getPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const values = React.useMemo(() => ({ posts }), [posts]);

  return <DBContext.Provider value={values}>{children}</DBContext.Provider>;
}

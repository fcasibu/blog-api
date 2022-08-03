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

export interface ITags {
  tag: string;
}

interface IDocuments {
  posts: IPost[];
  tags: ITags[];
  newPosts: IPost[];
}

interface IDatabase {
  documents: IDocuments;
  getFilteredPosts: (tag: string) => Promise<unknown>;
}

export const DBContext = React.createContext<IDatabase>({
  documents: {} as IDocuments,
  getFilteredPosts: async () => Promise<unknown>
});

export default function DBProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [documents, setDocuments] = React.useState({
    tags: [],
    posts: [],
    newPosts: []
  });

  const getFilteredPosts = async (tag: string) => {
    const response = await axios.get(`${SERVERURL}/api/posts?tag=${tag}`);

    setDocuments((prevState) => ({
      ...prevState,
      posts: response.data.posts
    }));
  };

  React.useEffect(() => {
    let ignore = false;
    const getDocuments = async () => {
      const postsQuery = axios.get(`${SERVERURL}/api/posts`);
      const tagsQuery = axios.get(`${SERVERURL}/api/posts/tags`);
      const newPostsQuery = axios.get(`${SERVERURL}/api/posts/new-posts`);

      const [postsRes, tagsRes, newPostsRes] = await Promise.all([
        postsQuery,
        tagsQuery,
        newPostsQuery
      ]);

      if (!ignore) {
        setDocuments({
          tags: tagsRes.data.tags,
          posts: postsRes.data.posts,
          newPosts: newPostsRes.data.posts
        });
      }
    };

    getDocuments();

    return () => {
      ignore = true;
    };
  }, []);

  const values = React.useMemo(
    () => ({ documents, getFilteredPosts }),
    [documents]
  );

  return <DBContext.Provider value={values}>{children}</DBContext.Provider>;
}

import axios from 'axios';
import * as React from 'react';
import { SERVERURL } from '../config';

export interface IUser {
  username: string;
  email: string;
  _id: string;
  __v: number;
}

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
  createdAt: Date;
  formattedDate: string;
}

export interface IPost {
  tag: string;
  formattedDate: string;
  commentCount: number;
  author: IUser;
  title: string;
  body: string;
  _id: string;
  published: boolean;
  createdAt: Date;
  comments: IComment[];
  __v: number;
}

export interface ITags {
  tag: string;
}

interface IDocuments {
  posts: IPost[];
  tags: ITags[];
  newPosts: IPost[];
  post: IPost | null;
}

interface IDatabase {
  documents: IDocuments;
  getFilteredPosts: (tag: string) => Promise<any>;
  getPost: (postId: string) => Promise<any>;
  createComment: (body: string, postId: string) => Promise<any>;
}

export const DBContext = React.createContext<IDatabase>({
  documents: {} as IDocuments,
  getFilteredPosts: async () => undefined,
  getPost: async () => undefined,
  createComment: async () => undefined
});

export default function DBProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [documents, setDocuments] = React.useState({
    tags: [],
    posts: [],
    newPosts: [],
    post: null
  });

  const getFilteredPosts = async (tag: string) => {
    const response = await axios.get(`${SERVERURL}/api/posts?tag=${tag}`);

    setDocuments((prevState) => ({
      ...prevState,
      posts: response.data.posts
    }));
  };

  const getPost = async (postId: string) => {
    try {
      const response = await axios.get(`${SERVERURL}/api/posts/${postId}`);
      setDocuments((prevState) => ({
        ...prevState,
        post: { ...response.data.post, comments: response.data.comments }
      }));
    } catch (err) {
      window.open(window.location.origin, "_self")
    }
  };

  const createComment = async (text: string, postId: string) => {
    return axios.post(
      `${SERVERURL}/api/posts/${postId}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
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
        setDocuments((prevState) => ({
          ...prevState,
          tags: tagsRes.data.tags,
          posts: postsRes.data.posts,
          newPosts: newPostsRes.data.posts
        }));
      }
    };

    getDocuments();

    return () => {
      ignore = true;
    };
  }, []);

  const values = React.useMemo(
    () => ({ documents, getFilteredPosts, getPost, createComment }),
    [documents]
  );

  return <DBContext.Provider value={values}>{children}</DBContext.Provider>;
}

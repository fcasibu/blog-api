import axios from 'axios';
import * as React from 'react';
import { SERVERURL } from '../config';
import useAuth from '../hooks/useAuth';
import { IPost } from './DBProvider';

interface PostData {
  title: string;
  tag: string;
  body: string;
  published?: string;
}

interface ICMSDocuments {
  posts: IPost[];
  post: IPost | null;
}

interface ICMS {
  documents: ICMSDocuments;
  getPost: (postId: string) => Promise<void>;
  editPost: (data: PostData, postId: string) => Promise<any>;
  createPost: (data: PostData, type: string) => Promise<any>;
}

export const CMSContext = React.createContext<ICMS>({
  documents: {} as ICMSDocuments,
  getPost: async () => undefined,
  editPost: async () => undefined,
  createPost: async () => undefined
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

  const createPost = async (data: PostData, type: string) => {
    return axios.post(`${SERVERURL}/api/users/${user?._id}/posts/${type}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  const getPost = async (postId: string) => {
    const response = await axios.get(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    setDocuments((prevState) => ({
      ...prevState,
      post: { ...response.data.post, comments: response.data.comments }
    }));
  };

  const editPost = async (data: PostData, postId: string) => {
    return axios.put(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}`,
      {
        ...data,
        createdAt: Date.now()
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  };

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
  }, [user, documents.post]);

  const values = React.useMemo(
    () => ({ documents, getPost, editPost, createPost }),
    [documents]
  );
  return <CMSContext.Provider value={values}>{children}</CMSContext.Provider>;
}

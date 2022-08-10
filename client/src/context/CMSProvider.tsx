import axios from 'axios';
import * as React from 'react';
import { SERVERURL } from '../config';
import useAuth from '../hooks/useAuth';
import { IPost } from './DBProvider';

/* interface PostData {
  title: string;
  tag: string;
  body: string;
  published?: string;
  image?: any;
} */

interface ICMSDocuments {
  posts: IPost[];
  post: IPost | null;
}

interface ICMS {
  documents: ICMSDocuments;
  loadComments: (page: number, postId: string) => Promise<void>;
  loadPost: (page: number, tag?: string) => Promise<void>;
  getPost: (postId: string) => Promise<void>;
  editPost: (data: FormData, postId: string) => Promise<any>;
  createPost: (data: FormData, type: string) => Promise<any>;
  deletePost: (postId: string) => Promise<void>;
  deleteComment: (postId: string, commentId: string) => Promise<void>;
}

export const CMSContext = React.createContext<ICMS>({
  documents: {} as ICMSDocuments,
  loadComments: async () => undefined,
  loadPost: async () => undefined,
  getPost: async () => undefined,
  editPost: async () => undefined,
  createPost: async () => undefined,
  deletePost: async () => undefined,
  deleteComment: async () => undefined
});

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
};

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

  const loadComments = async (page: number, postId: string) => {
    const response = await axios.get(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}/comments?page=${page}`,
      headers
    );
    const newComments = response.data.comments;
    const postCopy = JSON.parse(JSON.stringify(documents.post));
    postCopy.comments = [...postCopy.comments, ...newComments];

    setDocuments((prevState) => ({
      ...prevState,
      post: postCopy
    }));
  };

  const loadPost = async (page: number, tag?: string) => {
    const tagQuery = `&tag=${tag}`;
    const response = await axios.get(
      `${SERVERURL}/api/users/${user?._id}/posts?page=${page}${
        tag ? tagQuery : ''
      }`,
      headers
    );
    const newPosts = response.data.posts;

    setDocuments((prevState) => ({
      ...prevState,
      posts: prevState.posts.concat(newPosts)
    }));
  };

  const createPost = async (data: FormData, type: string) => {
    return axios.post(
      `${SERVERURL}/api/users/${user?._id}/posts/${type}`,
      data,
      headers
    );
  };

  const getPost = async (postId: string) => {
    const response = await axios.get(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}`,
      headers
    );
    setDocuments((prevState) => ({
      ...prevState,
      post: { ...response.data.post, comments: response.data.comments }
    }));
  };

  const deletePost = async (postId: string) => {
    await axios.delete(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}`,
      headers
    );
    const response = await axios.get(
      `${SERVERURL}/api/users/${user?._id}/posts`,
      headers
    );
    setDocuments((prevState) => ({
      ...prevState,
      posts: response.data.posts
    }));
  };

  const editPost = async (data: FormData, postId: string) => {
    return axios.put(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}`,
      data,
      headers
    );
  };

  const deleteComment = async (postId: string, commentId: string) => {
    await axios.delete(
      `${SERVERURL}/api/users/${user?._id}/posts/${postId}/comments/${commentId}`,
      headers
    );
    getPost(postId);
  };

  React.useEffect(() => {
    let ignore = false;

    if (user) {
      const getDocuments = async () => {
        const response = await axios.get(
          `${SERVERURL}/api/users/${user._id}/posts`,
          headers
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
    () => ({
      documents,
      loadPost,
      loadComments,
      getPost,
      editPost,
      createPost,
      deletePost,
      deleteComment
    }),
    [documents]
  );
  return <CMSContext.Provider value={values}>{children}</CMSContext.Provider>;
}

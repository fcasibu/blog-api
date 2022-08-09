import * as React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AxiosError } from "axios";
import { IComment } from "../../context/DBProvider";
import useForm from "../../hooks/useForm";
import handleAuthError from "../../utils/handleAuthError";
import Form, { FormControl } from "../Form";
import { TextArea } from "../Form/TextArea";
import { CommentList } from "./CommentList";
import useAuth from "../../hooks/useAuth";
import s from './PostDetailComment.module.css';

interface PostDetailCommentProps {
  comments: IComment[];
  postId: string;
  loadComments: (page: number, postId: string) => Promise<void>;
  getPost: (postId: string) => Promise<void>;
  createComment: (body: string, postId: string) => Promise<any>;
}

const initialValues = {
  text: ''
}

// Refactor duplicates
export default function PostDetailComment(props: PostDetailCommentProps) {
  const { comments, postId, createComment, getPost, loadComments } = props;
  const { user } = useAuth();
  const { formValues, changeHandler, errors, setErrors } = useForm(initialValues);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(2);
  const [parentRef] = useAutoAnimate<HTMLDivElement>()

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await createComment(formValues.text, postId);
      setIsLoading(false);
      if (response.data.errors) return setErrors(response.data.errors);

      await getPost(postId);
      setPageCount(2);
      setErrors([]);
    } catch (err) {
      setErrors(handleAuthError(err as AxiosError));
    }
  }

  const loadMoreHandler = () => {
    loadComments(pageCount, postId);
    setPageCount(pageCount + 1);
  };

  return (
    <div ref={parentRef}>
      <h4>Comments</h4>
      {user ?
        <Form onSubmit={submitHandler} isLoading={isLoading}>
          <FormControl id="text" label="Write a Comment" errors={errors}>
            <TextArea name="text" id="text" value={formValues.text} onChange={changeHandler} />
          </FormControl>
        </Form> : <div>You must be logged in to post a comment!</div>}
      <CommentList comments={comments} />
      {comments.length % (10 * (pageCount - 1)) === 0 &&
        <button className={s['load-more']} type="button" onClick={loadMoreHandler}>
          Load more
        </button>}
    </div>
  )
}

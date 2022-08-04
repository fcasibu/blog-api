import * as React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AxiosError } from "axios";
import { IComment } from "../../context/DBProvider";
import useDB from "../../hooks/useDB";
import useForm from "../../hooks/useForm";
import handleAuthError from "../../utils/handleAuthError";
import Form, { FormControl } from "../Form";
import { TextArea } from "../Form/TextArea";
import { CommentList } from "./CommentList";
import useAuth from "../../hooks/useAuth";

interface PostDetailCommentProps {
  comments: IComment[];
  postId: string;
}

const initialValues = {
  text: ''
}

export default function PostDetailComment({ comments, postId }: PostDetailCommentProps) {
  const { user } = useAuth();
  const { createComment, getPost } = useDB();
  const { formValues, changeHandler, errors, setErrors } = useForm(initialValues);
  const [isLoading, setIsLoading] = React.useState(false);
  const [parentRef] = useAutoAnimate<HTMLDivElement>()

  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await createComment(formValues.text, postId);
      setIsLoading(false);
      if (response.data.errors) return setErrors(response.data.errors);

      await getPost(postId);
      setErrors([]);
    } catch (err) {
      setErrors(handleAuthError(err as AxiosError));
    }
  }

  return (
    <div ref={parentRef}>
      <h4>Comments</h4>
      <CommentList comments={comments} />
      {user ?
        <Form onSubmit={submitHandler} isLoading={isLoading}>
          <FormControl id="text" label="Write a Comment" errors={errors}>
            <TextArea name="text" id="text" value={formValues.text} onChange={changeHandler} />
          </FormControl>
        </Form> : <div>You must be logged in to post a comment!</div>}
    </div>
  )
}

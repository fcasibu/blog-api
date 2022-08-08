import React from 'react';
import { IComment } from '../../context/DBProvider';
import useCMS from '../../hooks/useCMS';

export interface CommentProps {
  comment: IComment;
  isAuthor?: boolean;
  postId?: string;
}

export const Comment = React.memo(({ comment, isAuthor, postId }: CommentProps) => {
  const { deleteComment } = useCMS();

  const deleteHandler = async () => {
    await deleteComment(postId as string, comment._id as string);
  }

  return (
    <div>
      <h5>{comment.user.username}</h5>
      <p>{comment.text}</p>
      <span>{comment.formattedDate}</span>
      {isAuthor && (
        <div>
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
});

import React from 'react';
import { IComment } from '../../context/DBProvider';
import useCMS from '../../hooks/useCMS';
import s from './PostDetailComment.module.css';

export interface CommentProps {
  comment: IComment;
  isAuthor?: boolean;
  postId?: string;
}

export const Comment = React.memo(
  ({ comment, isAuthor, postId }: CommentProps) => {
    const { deleteComment } = useCMS();

    const deleteHandler = async () => {
      await deleteComment(postId as string, comment._id as string);
    };

    return (
      <div className={s['comment-box']}>
        <div className={s['comment-box__header']}>
          <h4>{comment.user.username}</h4>
          <span>{comment.formattedDate}</span>
        </div>
        <p>{comment.text}</p>
        {isAuthor && (
          <div>
            <button type="button" onClick={deleteHandler} className={s['delete-button']}>
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
);

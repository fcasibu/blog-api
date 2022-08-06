import React from 'react';
import { IComment } from '../../context/DBProvider';

export interface CommentProps {
  comment: IComment;
  isAuthor?: boolean;
}

export const Comment = React.memo(({ comment, isAuthor }: CommentProps) => (
  <div>
    <h5>{comment.user.username}</h5>
    <p>{comment.text}</p>
    <span>{comment.formattedDate}</span>
    {isAuthor && (
      <div>
        <button type="button">Delete</button>
      </div>
    )}
  </div>
));

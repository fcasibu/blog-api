import * as React from 'react';
import { IComment } from '../../context/DBProvider';
import { Comment } from './Comment';

interface CommentListProps {
  comments: IComment[];
  isAuthor?: boolean;
  postId?: string;
}

export const CommentList = React.memo(
  ({ comments, isAuthor, postId }: CommentListProps) => (
    <>
      {comments.map((comment: IComment) => (
        <Comment key={comment._id} comment={comment} isAuthor={isAuthor} postId={postId}/>
      ))}
    </>
  )
);

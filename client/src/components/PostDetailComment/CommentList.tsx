import * as React from 'react';
import { IComment } from '../../context/DBProvider';
import { Comment } from './Comment';

interface CommentListProps {
  comments: IComment[];
}

export const CommentList = React.memo(({ comments }: CommentListProps) => (
  <>
    {comments.map((comment: IComment) => (
      <Comment key={comment._id} comment={comment} />
    ))}
  </>
));

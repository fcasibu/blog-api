import * as React from 'react';
import { IComment } from "../../context/DBProvider"
import { Comment } from "./Comment"

interface CommentListProps {
  comments: any
}

export const CommentList = React.memo(({ comments }: CommentListProps) => (
  <>
    {comments.map((comment: IComment) => (
      /* eslint no-underscore-dangle: 0 */
      <Comment key={comment._id} comment={comment} />
    ))}
  </>
))

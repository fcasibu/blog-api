import React from "react";
import { IComment } from "../../context/DBProvider";

export interface CommentProps {
  comment: IComment;
}

export const Comment = React.memo(({ comment }: CommentProps) => (
  <div>
    <h5>{comment.user.username}</h5>
    <p>{comment.text}</p>
    <span>{comment.formattedDate}</span>
  </div >
));

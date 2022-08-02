import { Link } from 'react-router-dom';
import s from './Posts.module.css';

// TODO: Place this somewhere else
export interface IPost {
  tag: string;
  formattedDate: string;
  commentCount: number;
  author: any; // TODO: create type for author
  title: string;
  body: string;
  id: string;
}

interface ItemProps {
  postDetails: IPost;
}

export default function Item({ postDetails }: ItemProps) {
  return (
    <div>
      <div className={s['image-container']}>Hello World!</div>
      <div className={s['post-info']}>
        <div className={s['post-info__header']}>
          <span>{postDetails?.tag}</span>
          <span>{postDetails.formattedDate}</span>
          <span>{postDetails.author.username}</span>
        </div>
        <div className={s['post-info__body']}>
          <h3>{postDetails.title}</h3>
          <p>{postDetails.body}</p>
        </div>
        <div className={s['post-info__footer']}>
          <Link to={`${postDetails.id}`}>Read More</Link>
          <div>
            <span>{postDetails.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

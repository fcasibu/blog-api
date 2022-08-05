import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { IPost } from '../../context/DBProvider';
import s from './Posts.module.css';

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
          <div>{parse(postDetails.body)}</div>
        </div>
        <div className={s['post-info__footer']}>
          <Link to={`/posts/${postDetails._id}`}>Read More</Link>
          <div>
            <span>{postDetails.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

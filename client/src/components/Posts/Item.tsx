import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { IPost } from '../../context/DBProvider';
import s from './Posts.module.css';

interface ItemProps {
  postDetails: IPost;
}

export default function Item({ postDetails }: ItemProps) {
  return (
    <div className={s.post}>
      <div className={s['image-container']}>
        <img src={postDetails.image} alt="" />
      </div>
      <div className={s['post-info']}>
        <div className={s['post-info__header']}>
          <div>
            <span>{postDetails.tag}</span>
            <span>{postDetails.formattedDate}</span>
          </div>
          <span>{postDetails.author.username}</span>
        </div>
        <div className={s['post-info__body']}>
          <h3>{postDetails.title}</h3>
          <div>{parse(postDetails.body.slice(0, 200))}</div>
        </div>
        <div className={s['post-info__footer']}>
          <Link to={`/posts/${postDetails._id}`}>Read More &rarr;</Link>
          <div>
            <span style={{fontSize: '1.2rem'}}>{postDetails.commentCount} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

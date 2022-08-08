import * as React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../context/DBProvider';
import s from './Hero.module.css';

interface HeroProps {
  newPosts: IPost[];
}

const isPostOverFiveDays = (post: IPost) => {
  return  new Date(post.createdAt) <
  new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);}

function Hero({ newPosts }: HeroProps) {
  return (
    <div className={s.hero}>
      <h1>Read engaging blog posts while you brew</h1>
      <p>
        Multiple fantastic authors. Filled with posts that satisfies your daily
        reading needs
      </p>
      <button type="button">Check Them Out</button>
      <div className={s['image-container']}>
        {newPosts.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            key={post._id}
            className={s['post-image']}
          >
            <img src={post.image} alt="" />
            <div className={s['image-title']}>
              <p>{post.title}</p>
            </div>
            {isPostOverFiveDays(post) && (
              <span className={s['new-post']}>New</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Hero);

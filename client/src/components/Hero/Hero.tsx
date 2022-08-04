import * as React from 'react';
import { IPost } from '../../context/DBProvider';
import s from './Hero.module.css';

interface HeroProps {
  newPosts: IPost[];
}

function Hero({ newPosts }: HeroProps) {
  console.log(newPosts);
  return (
    <div className={s.hero}>
      <h1>Read engaging blog posts while you brew</h1>
      <p>
        Multiple fantastic authors. Filled with posts that satisfies your daily
        reading needs
      </p>
      <button type="button">Check Them Out</button>
      <div className={s['image-container']}>Hello World!</div>
    </div>
  );
}

export default React.memo(Hero);

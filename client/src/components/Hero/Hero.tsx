import s from './Hero.module.css';

export default function Hero() {
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

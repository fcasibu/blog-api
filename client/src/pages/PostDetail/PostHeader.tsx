import s from './PostDetail.module.css';

interface PostHeaderProps {
  author: string;
  tag: string;
  date: string;
  title: string;
  image: string;
}

export default function PostHeader({
  author,
  tag,
  date,
  title,
  image
}: PostHeaderProps) {
  return (
    <div className={s.header}>
      <div className={s.header__top}>
        <span>{tag}</span>
        <span>{date}</span>
        <span>{author}</span>
      </div>
      <h1>{title}</h1>
      <div className={s['image-container']}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

import parse from 'html-react-parser';
import s from './PostDetail.module.css';

interface PostBodyProps {
  body: string;
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div className={s['post-body']}>
      <div>{parse(body)}</div>
    </div>
  );
}

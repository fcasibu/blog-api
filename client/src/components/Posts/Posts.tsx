import { IPost } from '../../context/DBProvider';
import Item from './Item';

interface PostsProps {
  data: IPost[];
}

export default function Posts({ data }: PostsProps) {
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <h3>Posts</h3>
      {data.map((el: IPost) => (
        <Item postDetails={el} key={el.id} />
      ))}
    </>
  );
}

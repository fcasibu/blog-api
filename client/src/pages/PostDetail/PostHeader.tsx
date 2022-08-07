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
    <div>
      <div>
        <span>{tag}</span>
        <span>{date}</span>
        <span>{author}</span>
      </div>
      <h1>{title}</h1>
      <div>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

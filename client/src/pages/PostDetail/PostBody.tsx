import parse from 'html-react-parser';

interface PostBodyProps {
  body: string;
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div>
      <div>{parse(body)}</div>
    </div>
  );
}

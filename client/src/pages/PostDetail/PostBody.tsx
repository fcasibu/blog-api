interface PostBodyProps {
  body: string;
}

export default function PostBody({ body }: PostBodyProps) {
  return (
    <div>
      <p>{body}</p>
    </div>
  );
}

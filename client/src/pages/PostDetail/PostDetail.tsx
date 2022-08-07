import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useParams } from 'react-router-dom';
import PostDetailComment from '../../components/PostDetailComment';
import useDB from '../../hooks/useDB';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

export default function PostDetail() {
  const { postId } = useParams();
  const {
    documents: { post },
    getPost
  } = useDB();
  const [parentRef] = useAutoAnimate<HTMLDivElement>();

  React.useEffect(() => {
    getPost(postId as string);
  }, []);

  return (
    <div ref={parentRef}>
      {post && (
        <>
          <PostHeader
            author={post.author.username}
            tag={post.tag}
            date={post.formattedDate}
            title={post.title}
            image={post.image}
          />
          <PostBody body={post.body} />
          <PostDetailComment
            comments={post.comments}
            postId={postId as string}
          />
        </>
      )}
    </div>
  );
}

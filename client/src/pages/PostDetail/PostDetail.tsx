import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useParams } from 'react-router-dom';
import useDB from '../../hooks/useDB';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

export default function PostDetail() {
  const { postId } = useParams();
  const { documents } = useDB();
  const [parentRef] = useAutoAnimate<HTMLDivElement>();
  const post = documents.posts.find((el) => el.id === postId);

  return (
    <div ref={parentRef}>
      {post && (
        <>
          <PostHeader
            author={post.author.username}
            tag={post.tag}
            date={post.formattedDate}
            title={post.title}
          />
          <PostBody body={post.body} />
        </>
      )}
    </div>
  );
}

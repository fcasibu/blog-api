import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../context/DBProvider';
import useCMS from '../../hooks/useCMS';
import usePagination from '../../hooks/usePagination';
import Spinner from '../../components/Spinner';
import s from './CMS.module.css';

interface PostCardProps {
  post: IPost;
  deletePost: (postId: string) => Promise<void>;
}

function PostCard({ post, deletePost }: PostCardProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const deleteHandler = async () => {
    setIsLoading(true);
    await deletePost(post._id);
    setIsLoading(false);
  };
  return (
    <div className={s['post-card']}>
      <h4>{post.title}</h4>
      <p>
        <strong>Tag:</strong> {post.tag}
      </p>
      <p>
        <strong>Created at:</strong> {post.formattedDate}
      </p>
      <p>
        <strong>Status:</strong> {post.published ? 'Published' : 'Draft'}
      </p>
      <p>
        <strong>Comments:</strong> {post.commentCount}
      </p>
      <div className={s.buttons}>
        {post.published && (
          <button type="button" onClick={() => navigate(`/posts/${post._id}`)}>
            View post
          </button>
        )}
        <button type="button" onClick={() => navigate(`${post._id}/edit`)}>
          Edit Post
        </button>
        <button type="button" onClick={deleteHandler} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Delete Post'}
        </button>
      </div>
    </div>
  );
}

interface CardListProps {
  posts: IPost[];
  deletePost: (postId: string) => Promise<void>;
}

function CardList({ posts, deletePost }: CardListProps) {
  const [parentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div ref={parentRef} className={s['card-list']}>
      {!posts.length && <div style={{textAlign: 'center', fontSize: '3rem'}}>No posts</div>}
      {posts.map((post) => (
        <PostCard post={post} key={post._id} deletePost={deletePost} />
      ))}
    </div>
  );
}

export default function AllPosts() {
  const { documents, deletePost, loadPost } = useCMS();
  const { pageCount, loadMoreHandler } = usePagination();

  return (
    <div>
      <CardList posts={documents.posts} deletePost={deletePost} />
      {documents.posts.length &&
      documents.posts.length % (10 * (pageCount - 1)) === 0 ? (
        <button
          className={s['load-more']}
          type="button"
          onClick={() => loadMoreHandler({ cb: loadPost })}
        >
          Load more
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

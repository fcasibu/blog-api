import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../context/DBProvider';
import useCMS from '../../hooks/useCMS';

interface PostCardProps {
  post: IPost;
  deletePost: (postId: string) => Promise<void>;
}

function PostCard({ post, deletePost }: PostCardProps) {
  const navigate = useNavigate();
  const deleteHandler = async () => {
    await deletePost(post._id);
  };
  return (
    <div>
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
      <div>
        {post.published && (
          <button type="button" onClick={() => navigate(`/posts/${post._id}`)}>
            View Post
          </button>
        )}
        <button type="button" onClick={() => navigate(`${post._id}/edit`)}>
          Edit Post
        </button>
        <button type="button" onClick={deleteHandler}>
          Delete Post
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
    <div ref={parentRef}>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} deletePost={deletePost} />
      ))}
    </div>
  );
}

export default function AllPosts() {
  const { documents, deletePost } = useCMS();
  return (
    <div>
      <CardList posts={documents.posts} deletePost={deletePost} />
    </div>
  );
}

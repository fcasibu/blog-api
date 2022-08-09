import * as React from 'react';
import Hero from '../../components/Hero';
import Posts from '../../components/Posts';
import useDB from '../../hooks/useDB';

export default function Home() {
  const { documents, getFilteredPosts, getAllPost, loadPost } = useDB();
  const postsRef = React.useRef<HTMLHeadingElement | null>(null);

  const scrollToPosts = () => {
    if (postsRef.current) {
      postsRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Hero newPosts={documents.newPosts} scrollToPosts={scrollToPosts} />
      <Posts
        data={documents.posts}
        tags={documents.tags}
        getFilteredPosts={getFilteredPosts}
        getAllPost={getAllPost}
        loadPost={loadPost}
        ref={postsRef}
      />
    </>
  );
}

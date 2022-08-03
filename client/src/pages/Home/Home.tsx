import * as React from 'react';
import Hero from '../../components/Hero';
import Posts from '../../components/Posts';
import useDB from '../../hooks/useDB';

export default function Home() {
  const { documents, getFilteredPosts } = useDB();

  return (
    <>
      <Hero newPosts={documents.newPosts} />
      <Posts
        data={documents.posts}
        tags={documents.tags}
        getFilteredPosts={getFilteredPosts}
      />
    </>
  );
}

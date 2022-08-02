import React from 'react';
import Hero from '../../components/Hero';
import Posts from '../../components/Posts';
import useDB from '../../hooks/useDB';

export default function Home() {
  const { posts } = useDB();

  React.useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <>
      <Hero />
      <div>Hello World!</div>
      <Posts data={posts} />
    </>
  );
}

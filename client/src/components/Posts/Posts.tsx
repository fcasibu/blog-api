import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IPost, ITags } from '../../context/DBProvider';
import useModal from '../../hooks/useModal';
import Item from './Item';
import s from './Posts.module.css';

interface PostsProps {
  data: IPost[];
  tags: ITags[];
  getFilteredPosts: (tag: string) => Promise<unknown>;
}

export default function Posts({ data, tags, getFilteredPosts }: PostsProps) {
  const { isOpen, open, close } = useModal();
  if (!data) return <div>Loading...</div>;
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [parentRef] = useAutoAnimate<HTMLDivElement>();
  const [currentTag, setCurrentTag] = React.useState('');

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLDivElement)
      ) {
        close();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const filterPosts = (e: React.MouseEvent) => {
    const { value } = e.target as HTMLButtonElement;
    if (value === currentTag) return;
    setCurrentTag(value);

    getFilteredPosts(value);
  };

  return (
    <div ref={parentRef}>
      <h3>Posts</h3>
      <div className={s['drop-down-container']}>
        <button type="button" onClick={open}>
          Filter by Tags
        </button>
        {isOpen && (
          <div
            className={[s['drop-down'], s['drop-down--left']].join(' ')}
            ref={modalRef}
          >
            <div className={s['drop-down__beak']} />
            <div className={s['drop-down__divider']}>Tags</div>
            <div className={s['drop-down__body']}>
              {tags.map((el) => (
                <button
                  key={el.tag}
                  type="button"
                  value={el.tag}
                  onClick={filterPosts}
                >
                  {el.tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {data.map((el: IPost) => (
        <Item postDetails={el} key={el.id} />
      ))}
    </div>
  );
}

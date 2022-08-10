import * as React from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IPost, ITags } from '../../context/DBProvider';
import useModal from '../../hooks/useModal';
import Item from './Item';
import s from './Posts.module.css';
import usePagination from '../../hooks/usePagination';

interface PostsProps {
  data: IPost[];
  tags: ITags[];
  getFilteredPosts: (tag: string) => Promise<void>;
  getAllPost: () => Promise<void>;
  loadPost: (page: number, tag?: string) => Promise<void>;
}

const Posts = React.forwardRef<HTMLHeadingElement, PostsProps>((props, ref) => {
  const { data, tags, getFilteredPosts, getAllPost, loadPost } = props;
  const { pageCount, loadMoreHandler, setPageCount } = usePagination();
  const { isOpen, open, close } = useModal();
  const modalRef = React.useRef<HTMLDivElement | null>(null);
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
    setPageCount(2);
  };

  const filterAll = () => {
    if (!currentTag) return;
    setCurrentTag('');
    getAllPost();
    setPageCount(2);
  };

  return (
    <div ref={parentRef} className={s['posts-section']}>
      <h3 ref={ref} className={s['section-title']}>
        Posts
      </h3>
      <div className={s['drop-down-container']}>
        <button type="button" onClick={filterAll}>
          All
        </button>
        <button type="button" onClick={open}>
          Filter by Tags
        </button>
        {isOpen && (
          <div
            className={[s['drop-down'], s['drop-down--right']].join(' ')}
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
      {!data.length && <div style={{textAlign: 'center', fontSize: '3rem'}}>No Post</div>}
      {data.map((el: IPost) => (
        <Item postDetails={el} key={el._id} />
      ))}
      {data.length && data.length % (10 * (pageCount - 1)) === 0 ? (
        <button
          className={s['load-more']}
          type="button"
          onClick={() => loadMoreHandler({ cb: loadPost, tag: currentTag })}
        >
          Load more
        </button>
      ) : (
        ''
      )}
    </div>
  );
});

export default Posts;

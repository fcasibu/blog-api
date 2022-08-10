import * as React from 'react';

interface ILoadMore {
  cb: any;
  postId?: string;
  tag?: string;
}

export default function usePagination() {
  const [pageCount, setPageCount] = React.useState(2);

  const loadMoreHandler = React.useCallback(
    ({ cb, postId, tag }: ILoadMore) => {
      if (tag) {
        cb(pageCount, tag as string);
      } else if (postId) {
        cb(pageCount, postId as string);
      } else {
        cb(pageCount);
      }
      setPageCount(pageCount + 1);
    },
    [pageCount]
  );

  return { loadMoreHandler, pageCount, setPageCount };
}

import { SidebarLink } from './SidebarLink';

export function SidebarLinks() {
  return (
    <ul>
      <SidebarLink path="" text="All Posts" />
      <SidebarLink path="new-post" text="Add Post" />
    </ul>
  );
}

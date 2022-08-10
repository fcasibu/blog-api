import { SidebarLinks } from './SidebarLinks';
import s from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <div>
        <h4>Dashboard</h4>
        <SidebarLinks />
      </div>
    </aside>
  );
}

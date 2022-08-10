import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import s from './CMS.module.css';

export default function CMS() {
  return (
    <div className={s.cms}>
      <Sidebar />
      <Outlet />
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function CMS() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

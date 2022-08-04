import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  path: string;
  text: string;
}

export function SidebarLink({ path, text }: SidebarLinkProps) {
  return (
    <li>
      <Link to={path}>
        <span>{text}</span>
      </Link>
    </li>
  );
}

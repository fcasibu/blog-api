import { Link } from 'react-router-dom';
import s from './Header.module.css';

function SiteLogo() {
  return <div>CodeBrew</div>;
}

function Nav() {
  return (
    <nav>
      <ul className={s.links}>
        <li>
          <Link to="/signin">Sign in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className={s.header}>
      <SiteLogo />
      <Nav />
    </header>
  );
}

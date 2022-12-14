import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import s from './Header.module.css';

function SiteLogo() {
  return (
    <div>
      <Link to="/">CodeBrew</Link>
    </div>
  );
}

function Nav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const clickHandler = () => {
    signOut();
    navigate('/');
  };

  const links = user ? (
    <>
      <li>
        <Link to="/cms">CMS</Link>
      </li>
      <li>
        <button type="button" onClick={clickHandler}>
          Sign Out
        </button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/signin">Sign in</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
    </>
  );

  return (
    <nav>
      <ul className={s.links}>{links}</ul>
    </nav>
  );
}

function Header() {
  return (
    <div className={s['header-container']}>
      <header className={s.header}>
        <SiteLogo />
        <Nav />
      </header>
    </div>
  );
}

export default Header;

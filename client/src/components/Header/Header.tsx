import React from 'react';
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

  const links = !user ? (
    <>
      <li>
        <Link to="/signin">Sign in</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
    </>
  ) : (
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
  );

  return (
    <nav>
      <ul className={s.links}>{links}</ul>
    </nav>
  );
}

function Header() {
  return (
    <header className={s.header}>
      <SiteLogo />
      <Nav />
    </header>
  );
}

export default Header;

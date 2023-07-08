import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
// import { useHistory } from "react-router-dom";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    // history.push('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className='open-menu' onClick={openMenu}>
        <i className="fas fa-bars"/> <i className="fas fa-user-circle"/>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Hello, {user.username}</p>
            <p>{user.email}</p>
            <NavLink to='/spots/current' className='link-spots'>Manage Spots</NavLink>
            <div className="profile-button">
            <button onClick={logout}>Log Out</button>
            </div>


          </>
        ) : (
          <>
              <OpenModalMenuItem
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;

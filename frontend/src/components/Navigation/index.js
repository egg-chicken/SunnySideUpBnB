import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className='navbar'>
        <li className='home'>
          <NavLink exact to="/" className='nav-link home-link'>
            <i className='fas fa-brands fa-airbnb fa-rotate-180'/>
            airbnb
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
        {sessionUser && (
            <li>
                <NavLink to='/spots/create' className='nav-link'>
                    Create a New Spot
                </NavLink>
            </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div className='navbar'>
        <div className='home'>
          <NavLink exact to="/" className='nav-link home-link'>
            <i className='fas fa-brands fa-airbnb fa-rotate-180'/>
            airbnb
          </NavLink>
        </div>
        {isLoaded && (
            <ProfileButton user={sessionUser} />
        )}
        {sessionUser && (
                <NavLink to='/spots/new' className='nav-link'>
                    Create a New Spot
                </NavLink>
        )}
      </div>

  );
}

export default Navigation;

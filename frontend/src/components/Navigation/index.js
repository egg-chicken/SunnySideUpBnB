import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div className='navbar'>
        <div>
          <NavLink exact to="/" className='nav-link home-link'>
            <i className='fas fa-brands fa-airbnb fa-rotate-180'/>
            airbnb
          </NavLink>
        </div>
        <div className='right-nav-side'>
          {sessionUser && (
              <NavLink to='/spots/new' className='nav-link create-spot'>
                  Create a New Spot
              </NavLink>
          )}
          {isLoaded && (
              <ProfileButton user={sessionUser} />
          )}
        </div>
      </div>

  );
}

export default Navigation;

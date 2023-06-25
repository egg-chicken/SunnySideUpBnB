import {NavLink} from 'react-router-dom';
import React from 'react';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'

function Navigation ({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser}/>
                </li>
            )}
        </ul>
    );
}

export default Navigation;

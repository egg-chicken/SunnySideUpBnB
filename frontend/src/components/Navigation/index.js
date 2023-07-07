import {NavLink} from 'react-router-dom';
import React from 'react';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css'

// function Navigation ({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);
//     const dispatch = useDispatch();

//     const logout = (e) => {
//         e.preventDefault();
//         dispatch(sessionActions.logout());
//     };

//     let sessionLinks;
//     if(sessionUser) {
//         sessionLinks = (
//             <li>
//                 <ProfileButton user={sessionUser} />
//                 <button onClick={logout}>Log Out</button>
//             </li>
//         );
//     } else {
//         sessionLinks = (
//             <li className='right-align'>
//                 <NavLink to='/login' className='nav-link'>Log In</NavLink>
//                 <NavLink to='/signup' className='nav-link'>Sign Up</NavLink>
//             </li>
//         )
//     }


//     return (
//         <nav>
//             <ul className='navbar'>
//                 <li className='home'>
//                     <NavLink exact to='/' className='nav-link home-link'>
//                     <i className="fas fa-brands fa-airbnb fa-rotate-180" />
//                         airbnb
//                         </NavLink>
//                 </li>
//                 <li className='space'></li>
//             {isLoaded && sessionLinks}
//             {sessionUser && (
//                 <li>
//                     <NavLink to='/spots/create' className='nav-link'>
//                         Create a New Spot
//                     </NavLink>
//                 </li>
//             )}
//             </ul>
//         </nav>
//     );
// }

// export default Navigation;

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='home'>
            <li>
                <NavLink exact to='/' className='nav-link home-link'>
                <i className="fas fa-brands fa-airbnb fa-rotate-180" />
                    airbnb
                </NavLink>
            </li>
            <div className='menu'>
                {/* {sessionUser && (
                    <NavLink to='/spots/new'>Create a New Spot</NavLink>
                )} */}
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser}/>
                    </li>

                )}
            </div>
        </ul>
    )
}

export default Navigation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './navBarImage/Mask_group.png'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser) {

  return (
    <nav>
      <ul>
        <li className='navButtons'>
          <button><NavLink to='/' exact={true} activeClassName='active' className='innerNavButton'>
            Home
          </NavLink></button>
        </li>
        {/* <li className='navButtons'>
          <NavLink to='/users' exact={true} activeClassName='active' className='innerNavButton'>
            Users
          </NavLink>
          </li> */}
          <li className='navButtons'>
          <button><NavLink to={`/users/${sessionUser.id}`} activeClassName='active' className='innerNavButton'>
            Profile
          </NavLink></button>
          </li>
          <li className='navButtons'>
          <button><NavLink to='/posts' exact={true} activeClassName='active' className='innerNavButton'>
            Post
          </NavLink></button>
          </li>
          <li className='navButtons'>
          <button><NavLink to='/posts/create' exact={true} activeClassName='active' className='innerNavButton'>
            Add Post
          </NavLink></button>
          </li>
          <li className='navButtons'>
          <button><NavLink to='/matches' exact={true} activeClassName='active' className='innerNavButton'>
            Admires
          </NavLink></button>
          </li>
          <li className='navButtons'>
          <button><NavLink to='/matched' exact={true} activeClassName='active' className='innerNavButton'>
            Matches
          </NavLink></button>
          </li>
          {/* <li className='navButtons'>
          <button><NavLink to='/messages' exact={true} activeClassName='active' className='innerNavButton'>
            Messages
          </NavLink></button>
          </li> */}
        <li className='navButtons'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
} else {
  return (
    <nav>
      <ul>
          <li className='navButtons'>
          <button><NavLink to='/' exact={true} activeClassName='active' className='innerNavButton'>
            Home
          </NavLink></button>
        </li>
        <li className='navButtons'>
        <button><NavLink to='/login' exact={true} activeClassName='active' className='innerNavButton'>
            Login
          </NavLink></button>
        </li>
        <li className='navButtons'>
        <button><NavLink to='/sign-up' exact={true} activeClassName='active' className='innerNavButton'>
            Sign Up
          </NavLink></button>
        </li>
      </ul>
  </nav>
  )
}
}

export default NavBar;

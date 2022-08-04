
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li className='navButtons'>
          <NavLink to='/' exact={true} activeClassName='active' className='innerNavButton'>
            Home
          </NavLink>
        </li>
        <li className='navButtons'>
          <NavLink to='/login' exact={true} activeClassName='active' className='innerNavButton'>
            Login
          </NavLink>
        </li>
        <li className='navButtons'>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className='innerNavButton'>
            Sign Up
          </NavLink>
        </li>
        <li className='navButtons'>
          <NavLink to='/users' exact={true} activeClassName='active' className='innerNavButton'>
            Users
          </NavLink>
          </li>
          <li className='navButtons'>
          <NavLink to='/posts' exact={true} activeClassName='active' className='innerNavButton'>
            Post
          </NavLink>
          </li>
          <li className='navButtons'>
          <NavLink to='/posts/create' exact={true} activeClassName='active' className='innerNavButton'>
            Post Form
          </NavLink>
          </li>
          <li className='navButtons'>
          <NavLink to='/matches' exact={true} activeClassName='active' className='innerNavButton'>
            Matches
          </NavLink>
          </li>
        <li className='navButtons'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

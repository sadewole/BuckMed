import React from 'react';
import { NavLink } from 'react-router-dom';
import LeftPanel from './LeftPanel';
import Avatar from '../../../common/Avatar';
import styled from 'styled-components';

const base = ({ children }) => {
  return (
    <MainHeader>
      <nav className='main-header navbar navbar-expand navbar-light'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link hide-on-lg' id='pushmenu' to='#'>
              <i className='fas fa-bars'></i>
            </NavLink>
          </li>
          <li className='nav-item d-none d-sm-inline-block'>
            <NavLink to='#' className='nav-link'>
              Dashboard
            </NavLink>
          </li>
        </ul>

        <ul className='navbar-nav ml-auto'>
          <li className='nav-item dropdown'>
            <NavLink className='nav-link' data-toggle='dropdown' to='#'>
              <i className='far fa-bell'></i>
              <span className='badge badge-danger navbar-badge'>5</span>
            </NavLink>
          </li>
          <li className='nav-item d-flex align-items-center'>
            <NavLink className='nav-link' data-toggle='dropdown' to='#'>
              <Avatar rounded name='John Doe' size='small' />
              <span className='mx-2'>
                John Doe
                <i className='ml-2 fas fa-chevron-down'></i>
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <LeftPanel />
      <main className='content-wrapper px-3'>{children}</main>
    </MainHeader>
  );
};

const MainHeader = styled.div`
  min-height: 100%;
  position: relative;

  .layout-fixed {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.164);
    z-index: 1020;
  }

  .content-wrapper {
    width: calc(100% - 250px);
    min-height: calc(100vh - calc(3.5rem + 1px) - calc(3.5rem + 1px));
    margin-top: calc(3.5rem + 1px);
    margin-left: calc(250px);
    transition: all 0.3s ease-in-out;
    padding: 10px;
  }

  .content-wrapper.extend {
    margin-left: 0px;
  }

  .content-wrapper.extend,
  .main-header.navbar.extend {
    width: 100%;
  }

  .main-header {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
  }

  .main-header.navbar {
    transition: width 0.3s ease-in-out;
    width: calc(100% - (250px - 0.5rem));
    border-bottom: 1px solid #ddd;
  }
`;

export default base;

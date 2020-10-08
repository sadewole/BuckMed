import React, { useLayoutEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'src/components/Avatar';
import styled from 'styled-components';
import SideBar from './sidebar';
import { useTheme, useMediaQuery } from '@material-ui/core';

const Base = ({ children }) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  let layoutFixed = useRef();
  let contentWrapper = useRef();
  let mainNavbar = useRef();

  const handlePushMenu = () => {
    setShow(true);
    layoutFixed.current.style.display = 'block';
  };

  const handleLayoutFixed = () => {
    layoutFixed.current.style.display = 'none';
    setShow(false);
  };

  useLayoutEffect(() => {
    if (mobileDevice) {
      setShow(false);
      contentWrapper.current.style.marginLeft = '0px';
      contentWrapper.current.classList.add('extend');
      mainNavbar.current.classList.add('extend');
    } else {
      setShow(true);
      contentWrapper.current.style.marginLeft = '250px';
      contentWrapper.current.classList.remove('extend');
      mainNavbar.current.classList.remove('extend');
      layoutFixed.current.style.display = 'none';
    }
  }, [mobileDevice]);

  return (
    <MainBase>
      <div
        className='layout-fixed'
        ref={layoutFixed}
        onClick={handleLayoutFixed}
      ></div>
      <nav
        className='main-header navbar navbar-expand navbar-light'
        ref={mainNavbar}
      >
        <ul className='navbar-nav'>
          <li
            className={`nav-item ${!mobileDevice && 'display-none'}`}
            onClick={handlePushMenu}
          >
            <NavLink className='nav-link' to='#'>
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

      <SideBar show={show} />
      <main className='content-wrapper px-3' ref={contentWrapper}>
        {children}
      </main>
    </MainBase>
  );
};

const MainBase = styled.div`
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
    min-height: calc(100vh - calc(3.5rem + 9px));
    margin-top: calc(3.5rem + 9px);
    margin-left: calc(250px);
    transition: all 0.3s ease-in-out;
    padding: 10px;
    background: #e3e3e3;
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
    background: #fff;
  }

  .main-header.navbar {
    transition: width 0.3s ease-in-out;
    width: calc(100% - (250px - 0.5rem));
    border-bottom: 1px solid #ddd;
  }
`;

export default Base;

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const navigate = [
  {
    name: 'Dashboard',
    link: 'dashboard',
    icon: 'fas fa-tachometer-alt',
  },
  {
    name: 'Appointment',
    link: 'appointment',
    icon: 'far fa-calendar-alt',
  },
  {
    name: 'Patients',
    link: 'patient',
    icon: 'fas fa-user-friends',
  },
  {
    name: 'Doctors',
    link: 'all',
    icon: 'fas fa-user-md',
  },
  {
    name: 'Finance',
    link: 'finance',
    icon: 'fas fa-chart-line',
  },
  {
    name: 'History',
    link: 'history',
    icon: 'fas fa-th',
  },
];

const LeftPanel = () => {
  return (
    <LeftSideBar className='show'>
      {/* Brand Logo*/}
      <NavLink to='#' className='brand-link'>
        <span className='brand-text font-weight-light'>BuckMed</span>
      </NavLink>

      {/* Sidebar*/}
      <div className='sidebar'>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {navigate.map((val, index) => {
              return (
                <li className='nav-item' key={index}>
                  <NavLink to={`/doctor/${val.link}`} className='nav-link'>
                    <i className={`nav-icon ${val.icon}`}></i>
                    <p>{val.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </LeftSideBar>
  );
};

const LeftSideBar = styled.aside`
  position: fixed;
  top: 0;
  left: -350px;
  height: 100vh;
  overflow-y: hidden;
  background-color: #fff;
  z-index: 1038;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.691);
  /* display: none; */
  transition: all 0.3s ease-in-out;
  width: 250px;

  &::before {
    transition: all 0.3s ease-in-out;
    width: 250px;
  }

  &.show {
    left: 0;
  }

  .brand-link {
    display: block;
    height: 60px;
    text-decoration: none;
  }

  .sidebar {
    height: calc(100% - (3.5rem + 1px));
    overflow-y: auto;
    padding-bottom: 0;
    padding-top: 0;
  }

  .sidebar::-webkit-scrollbar {
    width: 5px;
  }

  .sidebar::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    background-color: darkgray;
  }

  .nav-pills .nav-link {
    border-radius: 0px !important;
  }

  .nav-pills .nav-link.active {
    border-left: 5px solid #007bff;
    color: #007bff !important;
    background: #eee;
  }

  .nav-sidebar > .nav-item {
    margin-bottom: 0;
    transition: all 0.5s ease-in-ease-out;
  }

  .nav-sidebar .nav-item > .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    text-decoration: none;
    color: inherit;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .nav-sidebar > .nav-item:hover {
    opacity: 0.75;
    background: #e3e3e3;
    padding-left: 5px;
  }

  .nav-sidebar > .nav-item .nav-icon {
    margin-left: 0.05rem;
    font-size: 1.2rem;
    margin-right: 1rem;
    text-align: center;
    width: 1.6rem;
  }

  .nav-sidebar > .nav-item .nav-icon {
    font-size: 1.6rem;
  }

  .nav-sidebar .nav-link > p {
    margin: 0;
    font-size: larger;
  }

  .nav-sidebar .nav-link > p > .right {
    position: absolute;
    right: 1rem;
    top: 0.7rem;
  }
`;

export default LeftPanel;

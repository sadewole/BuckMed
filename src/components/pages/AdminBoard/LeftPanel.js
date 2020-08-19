import React from 'react';
import styled from 'styled-components';

const LeftPanel = () => {
  return (
    <LeftSideBar class='main-sidebar sidebar-dark-primary elevation-4'>
      {/* Brand Logo*/}
      <a href='index3.html' class='brand-link'>
        <img
          src='dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          class='brand-image img-circle elevation-3'
          style='opacity: .8'
        />
        <span class='brand-text font-weight-light'>AdminLTE 3</span>
      </a>

      {/* Sidebar*/}
      <div class='sidebar'>
        {/* Sidebar user panel (optional)*/}
        <div class='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div class='image'>
            <img
              src='dist/img/user2-160x160.jpg'
              class='img-circle elevation-2'
              alt='User Image'
            />
          </div>
          <div class='info'>
            <a href='#' class='d-block'>
              Alexander Pierce
            </a>
          </div>
        </div>

        {/* Sidebar Menu */}

        <nav class='mt-2'>
          <ul
            class='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            {/* Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library */}
            <li class='nav-item has-treeview menu-open'>
              <a href='#' class='nav-link active'>
                <i class='nav-icon fas fa-tachometer-alt'></i>
                <p>
                  Dashboard
                  <i class='right fas fa-angle-left'></i>
                </p>
              </a>
            </li>
            <li class='nav-item'>
              <a href='pages/widgets.html' class='nav-link'>
                <i class='nav-icon fas fa-th'></i>
                <p>
                  Widgets
                  <span class='right badge badge-danger'>New</span>
                </p>
              </a>
            </li>
            <li class='nav-item has-treeview'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-copy'></i>
                <p>
                  Layout Options
                  <i class='fas fa-angle-left right'></i>
                  <span class='badge badge-info right'>6</span>
                </p>
              </a>
            </li>
            <li class='nav-item has-treeview'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-chart-pie'></i>
                <p>
                  Charts
                  <i class='right fas fa-angle-left'></i>
                </p>
              </a>
            </li>
            <li class='nav-item has-treeview'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-tree'></i>
                <p>
                  UI Elements
                  <i class='fas fa-angle-left right'></i>
                </p>
              </a>
            </li>
            <li class='nav-item has-treeview'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-edit'></i>
                <p>
                  Forms
                  <i class='fas fa-angle-left right'></i>
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </LeftSideBar>
  );
};

const LeftSideBar = styled.aside`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 250px;
  height: 100vh;
  box-shadow: ;
`;

export default LeftPanel;

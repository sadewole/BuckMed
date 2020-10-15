import React, { useState, useLayoutEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from './Logo';

const NavBar = () => {
  const [page, setPage] = useState('');

  const elementOptions = () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      setPage('top');
    } else {
      setPage('');
    }
  };

  useLayoutEffect(() => {
    window.onscroll = () => elementOptions();
  }, []);

  return (
    <Navbar
      bg='light'
      expand='lg'
      variant='light'
      fixed={page}
      className='nav-bar'
    >
      <Navbar.Brand href='/'>
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto align-items-center'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/#about'>About</Nav.Link>
          <Nav.Link href='/contact'>Contact</Nav.Link>
          <Nav.Link href='/login'>
            <button className='btn  btn-outline-primary  btn-transparent-blue'>
              Login
            </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

import React, { useState, useLayoutEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

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
    <div className='bg-light'>
      <div
        className={`container-fluid grey ${page !== 'top' && 'display-none'}`}
      >
        <Nav className='justify-content-end'>
          <Nav.Link href='#'>
            <i className='far fa-envelope mr-2' /> info@buckman.com
          </Nav.Link>
          <Nav.Link href='#'>
            <i className='fas fa-phone-alt mr-2' /> 09011111care
          </Nav.Link>
        </Nav>
      </div>
      <Navbar bg='light' variant='light' fixed={page}>
        <Navbar.Brand href='#home'>BuckMed</Navbar.Brand>
        <Nav className='ml-auto align-items-center'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/#about'>About</Nav.Link>
          <Nav.Link href='/contact'>Contact</Nav.Link>
          <Nav.Link href='/login'>
            <button className='btn btn-transparent-blue'>Login</button>
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;

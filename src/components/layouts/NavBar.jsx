import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const NavBar = () => {
  return (
    <div>
      <Navbar bg='light' variant='light' fixed='top'>
        <Navbar.Brand href='#home'>BuckMed</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;

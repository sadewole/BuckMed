import React, { Fragment } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  );
};

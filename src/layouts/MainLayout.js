import React from 'react';
import NavBar from 'src/components/NavBar';
import Footer from 'src/components/Footer';

export default ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

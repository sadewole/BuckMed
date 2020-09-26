import React from 'react';

const Footer = () => (
  <div className='d-flex align-items-center justify-content-center py-4 container-fluid'>
    <p className='lead '>&copy; {new Date().getFullYear()} - BuckMed</p>
  </div>
);

export default Footer;

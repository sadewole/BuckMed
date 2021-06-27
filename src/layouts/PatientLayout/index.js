import React from 'react';

const PatientLayout = ({ children }) => {
  return (
    <div>
      {' '}
      <main className='content-wrapper px-3'>{children}</main>
    </div>
  );
};

export default PatientLayout;

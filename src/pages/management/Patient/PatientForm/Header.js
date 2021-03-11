import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <div className='m-3'>
      <h3 className='text-primary text-capitalize'>{title}</h3>
      <p>Please, input the correct patient data</p>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

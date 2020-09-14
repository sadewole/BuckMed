import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const GuestGuard = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;

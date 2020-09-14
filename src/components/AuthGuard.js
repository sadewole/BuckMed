import React, { Fragment } from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthGuard = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;

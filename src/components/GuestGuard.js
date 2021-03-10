import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to='/doctor' />;
  }

  return <Fragment>{children}</Fragment>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;

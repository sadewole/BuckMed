import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { PlusCircle as PlusCircleIcon } from 'react-feather';

const Header = ({ className, ...rest }) => {
  return (
    <Row className='justify-content-between m-3' container {...rest}>
      <Row item>
        <h3 className='text-primary'> All Customers</h3>
      </Row>
      <Row item>
        <Button variant='primary'>
          <PlusCircleIcon className='mr-1' />
          New Customer
        </Button>
      </Row>
    </Row>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;

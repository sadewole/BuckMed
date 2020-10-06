import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Row } from 'react-bootstrap';
import { PlusCircle as PlusCircleIcon } from 'react-feather';

const Header = ({ className, ...rest }) => {
  return (
    <Row className='justify-content-between m-3' {...rest}>
      <Row>
        <h3 className='text-primary'>Patients</h3>
      </Row>
      <Row>
        <Link to='/doctor/management/patients/new'>
          <Button variant='primary'>
            <PlusCircleIcon className='mr-1' />
            New Patient
          </Button>
        </Link>
      </Row>
    </Row>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
